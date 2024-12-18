import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import useUserStore from "@/store/userStore";
import { db } from "@/lib/firebase";
import UserAvatar from "./UserAvatar";

export default function ConvoHeader({
  chatId,
}: {
  chatId: string | undefined;
}) {
  const { currentUser, users } = useUserStore();
  const [receiverInfo, setReceiverInfo] = useState<DocumentData>();

  useEffect(() => {
    const fetchReceiverInfo = async () => {
      try {
        // First, fetch userChats of currentUser
        const currentUserChats = doc(db, "userChats", currentUser?.id || "");
        const currentUserDoc = await getDoc(currentUserChats);

        if (!currentUserDoc.exists()) return;

        // Get the conversation data array
        const { conversation } = currentUserDoc.data();

        // Extract the receiverId
        const { receiverId } = conversation.find(
          (i: DocumentData) => i.chatId === chatId
        );

        // Set the receiver information
        const receiver = users.find((user) => user.id === receiverId);
        setReceiverInfo(receiver);
        // Here, in users we also fetching its online status
      } catch (error) {
        console.error(error);
      }
    };

    fetchReceiverInfo();
  }, [chatId, users]);

  return (
    <header className="border-b flex items-center px-5 py-2">
      <div className="flex items-center gap-3">
        <UserAvatar
          username={receiverInfo?.username || ""}
          onlineIndicator={{
            avail: true,
            active: receiverInfo?.isOnline ? true : false,
          }}
        />
        <div className="space-y-1">
          <h3>{receiverInfo?.username || ""}</h3>
          <p className="text-xs text-gray-400">
            {receiverInfo?.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </header>
  );
}
