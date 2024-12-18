import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import useUserStore from "@/store/userStore";
import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import SidebarChatsPlaceholder from "./SidebarChatsPlaceholder";
import SidebarChatsEmpty from "./SidebarChatsEmpty";
import { useMediaQuery } from "usehooks-ts";
import SidebarHeader from "./SidebarHeader";

export default function SidebarChats() {
  const { currentUser, users } = useUserStore();

  const isDesktopView = useMediaQuery("(min-width: 768px)");

  // For userChats
  const [chats, setChats] = useState<DocumentData[]>([]);
  const userCache = useRef(new Map());

  // For loading chats
  const [isChatsLoading, setIsChatsLoading] = useState(true);

  // useEffect(() => {
  //   if (!currentUser?.id) {
  //     setChats([]);
  //     return;
  //   }

  //   // Subscribe to real-time updates for userChats
  //   const unSub = onSnapshot(
  //     doc(db, "userChats", currentUser?.id || ""),
  //     async (res) => {
  //       const items = res.data()?.conversation || [];

  //       try {
  //         // Fetch user details and enrich chat data
  //         const chatData = await Promise.all(
  //           items.map(async (item: DocumentData) => {
  //             let user = userCache.current.get(item.receiverId);

  //             if (!user) {
  //               // Fetch user data if not cached
  //               const userDocSnap = await getDoc(
  //                 doc(db, "users", item.receiverId)
  //               );
  //               user = userDocSnap.data();
  //               userCache.current.set(item.receiverId, user); // Cache the fetched user
  //             }

  //             return { ...item, user };
  //           })
  //         );

  //         // Sort chats by updatedAt
  //         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
  //       } catch (error) {
  //         console.error("Failed to fetch chats:", error);
  //       }
  //     }
  //   );

  //   return () => {
  //     unSub();
  //   };
  // }, [currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id) {
      setChats([]);
      setIsChatsLoading(false);
      return;
    }

    const fetchUserData = async (items: DocumentData) => {
      const chatData = items.map((item: DocumentData) => {
        const user = userCache.current.get(item.receiverId);
        return user
          ? Promise.resolve({ ...item, user })
          : getDoc(doc(db, "users", item.receiverId))
              .then((userDocSnap) => {
                const user = userDocSnap.data();
                userCache.current.set(item.receiverId, user);
                return { ...item, user };
              })
              .catch((error) => {
                console.error(
                  `Failed to fetch user ${item.receiverId}:`,
                  error
                );
                return { ...item, user: null }; // Fallback for failed fetches
              });
      });

      return Promise.all(chatData);
    };

    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data()?.conversation || [];

        try {
          const chatData = await fetchUserData(items);

          setChats((prevChats) => {
            const isSame =
              prevChats.length === chatData.length &&
              prevChats.every(
                (chat, index) => chat.updatedAt === chatData[index].updatedAt
              );

            return isSame
              ? prevChats
              : chatData.sort((a, b) => b.updatedAt - a.updatedAt);
          });
        } catch (error) {
          console.error("Failed to fetch chats:", error);
        } finally {
          setIsChatsLoading(false);
        }
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  return (
    // Border-r here
    <div
      className={`${
        isDesktopView && "max-w-[18rem] border-r"
      } w-full flex flex-col`}
    >
      {/* Sidebar Header */}
      <SidebarHeader />

      <ScrollArea>
        <div className="p-3 flex flex-col gap-3">
          {isChatsLoading ? (
            <SidebarChatsPlaceholder />
          ) : !chats.length ? (
            <SidebarChatsEmpty />
          ) : (
            chats.map((chat) => {
              const { chatId, user, isSeen, lastMessage } = chat;

              const snapshotUser = users.find((u) => u.id === user.id);

              return (
                <Link to={`/home/c/${chatId}`} key={chatId}>
                  <div
                    className="overflow-hidden px-3 py-2 hover:bg-secondary rounded-md flex items-center gap-3 
                  "
                  >
                    <UserAvatar
                      username={user.username || ""}
                      onlineIndicator={{
                        avail: true,
                        active: snapshotUser?.isOnline ? true : false,
                      }}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="line-clamp-1">{user.username}</p>
                      <p
                        className={`text-xs line-clamp-1 ${
                          isSeen ? "font-light text-gray-400" : "font-semibold"
                        }`}
                      >
                        {lastMessage}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
