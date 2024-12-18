import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import {
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ConvoHeader from "../ConvoHeader";
import ConvoInputMessage from "../ConvoInputMessage";
import useUserStore from "@/store/userStore";
import { relativeTimeSent } from "@/utils";
import { Loader2 } from "lucide-react";
import NoConversationUI from "../NoConversationUI";

export default function Convo() {
  const { chatId } = useParams();
  const { currentUser, users } = useUserStore();

  const [messages, setMessages] = useState<DocumentData>([]);

  // For messages UI
  const [receiver, setReceiver] = useState("");
  const [showMessageDate, setShowMessageDate] = useState("");
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  // For auto-scrolling to the latest messages.
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if (!chatId) {
  //     setMessages([]);
  //     setIsMessagesLoading(false);
  //     return;
  //   }

  //   // Get the message real-time
  //   const unSub = onSnapshot(doc(db, "conversation", chatId || ""), (res) => {
  //     const data = res.data()?.messages;

  //     setMessages(data);
  //   });

  //   // Update userChats if user have seen the conversation or new message.
  //   const updateUserChats = async () => {
  //     try {
  //       const userChatRef = doc(db, "userChats", currentUser?.id || "");
  //       const userDocSnap = await getDoc(userChatRef);

  //       if (userDocSnap.exists()) {
  //         const userData = userDocSnap.data()?.conversation;

  //         const chatIndex = userData.findIndex(
  //           (i: DocumentData) => i.chatId === chatId
  //         );

  //         // Get the receiverName so we can use it in the messages UI.
  //         const receiver = users?.find(
  //           (u: DocumentData) => u.id === userData[chatIndex].receiverId
  //         );
  //         setReceiver(receiver.username);

  //         // If isSeen is true return, otherwise update it to true and update the userChats doc
  //         if (userData[chatIndex].isSeen) {
  //           return;
  //         } else {
  //           userData[chatIndex].isSeen = true;

  //           await updateDoc(userChatRef, {
  //             conversation: userData,
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsMessagesLoading(false);
  //     }
  //   };

  //   updateUserChats();

  //   return () => {
  //     unSub();
  //   };
  // }, [chatId]);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setIsMessagesLoading(false);
      return;
    }

    // Get the messages real-time and store it in messages state
    const unSub = onSnapshot(doc(db, "conversation", chatId || ""), (res) => {
      try {
        const data = res.data()?.messages;
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsMessagesLoading(false);
      }
    });

    // Fetch and update user chats
    const updateUserChats = async () => {
      try {
        // Fetch the userChats
        const userChatRef = doc(db, "userChats", currentUser?.id || "");
        const userDocSnap = await getDoc(userChatRef);

        if (!userDocSnap.exists()) return;

        const userData = userDocSnap.data()?.conversation || [];
        const chatIndex = userData.findIndex(
          (i: DocumentData) => i.chatId === chatId
        );
        // If returns -1 means error not found.
        if (chatIndex === -1) return;

        // Get the receiver's username
        const receiver = users?.find(
          (u: DocumentData) => u.id === userData[chatIndex]?.receiverId
        );
        if (receiver) {
          setReceiver(receiver.username);
        }

        // Check if the isSeen field is false, if it false, change it to true and update the document
        if (!userData[chatIndex]?.isSeen) {
          userData[chatIndex].isSeen = true;

          await updateDoc(userChatRef, {
            conversation: userData,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateUserChats();

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div className="flex-1 flex-between flex-col">
      {/* / Chat Header / */}
      <ConvoHeader chatId={chatId} />

      {/* / Conversation / */}
      <div className="flex-1 flex flex-col justify-end overflow-hidden">
        <ScrollArea>
          <main className="p-3 flex flex-col gap-3 justify-end h-full">
            {/* If messages is empty */}

            {isMessagesLoading ? (
              <div className="py-10 px-5 flex-center space-x-1">
                <Loader2 className="animate-spin" />
                <p>Loading...</p>
              </div>
            ) : !messages.length ? (
              <NoConversationUI />
            ) : (
              messages.map((text: DocumentData) => {
                const { senderId, message, createdAt } = text;
                return (
                  <div
                    key={createdAt.seconds}
                    className={`flex ${
                      senderId === currentUser?.id && "justify-end"
                    }`}
                  >
                    <div className="max-w-[48%] text-pretty flex flex-col items-start gap-1">
                      {/* Receiver Username */}
                      {senderId !== currentUser?.id && (
                        <p className="text-[0.65rem] line-clamp-1">
                          {receiver}
                        </p>
                      )}

                      {/* Message */}
                      <p
                        className={`${
                          senderId === currentUser?.id && "place-self-end"
                        } p-3 border rounded-xl text-wrap`}
                        onClick={() => {
                          if (showMessageDate === createdAt.seconds) {
                            setShowMessageDate("");
                          } else {
                            setShowMessageDate(createdAt.seconds);
                          }
                        }}
                      >
                        {message}
                      </p>

                      {/* Date sent */}
                      {showMessageDate === createdAt.seconds && (
                        <div
                          className={`flex text-[0.65rem] font-extralight ${
                            senderId !== currentUser?.id &&
                            "justify-end place-self-end"
                          }`}
                        >
                          <p>
                            {relativeTimeSent(
                              createdAt.nanoseconds,
                              createdAt.seconds
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Dummy div to auto-scroll */}
            <div ref={endRef}></div>
          </main>
        </ScrollArea>
      </div>

      {/* / Type Message Field / */}
      <ConvoInputMessage chatId={chatId} />
    </div>
  );
}
