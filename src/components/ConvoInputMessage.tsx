import { CirclePlus, Send, Smile } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import useUserStore from "@/store/userStore";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "usehooks-ts";

export default function ConvoInputMessage({
  chatId,
}: {
  chatId: string | undefined;
}) {
  const { currentUser } = useUserStore();

  const isDesktopView = useMediaQuery("(min-width: 768px)");

  const [message, setMessage] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message) return;

    setMessage(""); // Reset the message promptly

    try {
      // First send the message, by updating or adding data to conversation collection
      await sendMessageToConversation();

      // Then, update userChats for both the current user/sender and the receiver.
      const updatedUserChats = await updateUserChat(
        currentUser?.id || "",
        true
      );
      // By using the sender conversation data which is return by updatedUserChats, now extract the receiverId from it by using findReceiver helper function.
      // If it successfully fetched the receiverId, now update the userChats collection of receiver
      const receiverId = findReceiverId(updatedUserChats);
      if (receiverId) {
        await updateUserChat(receiverId, false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // Helper function
  async function sendMessageToConversation() {
    return updateDoc(doc(db, "conversation", chatId || ""), {
      messages: arrayUnion({
        senderId: currentUser?.id,
        message,
        createdAt: new Date(),
      }),
    });
  }

  // Helper function to update userChats for a given user
  async function updateUserChat(userId: string, isSeen: boolean) {
    const userChatsRef = doc(db, "userChats", userId);
    const userChatsDocSnap = await getDoc(userChatsRef);

    if (!userChatsDocSnap.exists()) {
      console.log(`User chats for user ${userId} not found`);
      return [];
    }

    const conversationData = userChatsDocSnap.data()?.conversation || [];
    const chatIndex = conversationData.findIndex(
      (c: DocumentData) => c.chatId === chatId
    );

    if (chatIndex >= 0) {
      conversationData[chatIndex] = {
        ...conversationData[chatIndex],
        lastMessage: message,
        isSeen,
        updatedAt: Date.now(),
      };

      await updateDoc(userChatsRef, { conversation: conversationData });
    }

    return conversationData;
  }

  // Helper function to find the receiver's ID from conversation data
  function findReceiverId(conversationData: DocumentData[]): string {
    const chat = conversationData.find(
      (item: DocumentData) => item.chatId === chatId
    );
    return chat?.receiverId || "";
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <form
      className="border-t px-5 py-3 flex items-center flex-col gap-2 relative"
      onSubmit={handleSendMessage}
    >
      <div className="flex-between items-center w-full gap-2">
        <CirclePlus className="flex-shrink-0" />
        <Input
          placeholder="Type a message here"
          className="h-11 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {isDesktopView ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex-shrink-0 p-1 rounded-full hover:bg-secondary"
                type="button"
              >
                <Smile />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0 border-none" align="end">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={Theme.DARK}
                lazyLoadEmojis={true}
                searchDisabled={true}
                height={350}
                width={280}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            type="button"
            className="rounded-full p-1 hover:bg-secondary flex-shrink-0"
            onClick={() => setShowPicker(!showPicker)}
          >
            <Smile />
          </button>
        )}

        <Button type="submit">
          <Send />
          Send
        </Button>
      </div>

      {!isDesktopView && showPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme={Theme.DARK}
          lazyLoadEmojis={true}
          searchDisabled={true}
          width="100%"
          height={280}
        />
      )}
    </form>
  );
}
