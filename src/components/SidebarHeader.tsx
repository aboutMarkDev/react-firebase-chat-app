import { Loader2, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";
import UserAvatar from "./UserAvatar";
import useUserStore from "@/store/userStore";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

export default function SidebarHeader() {
  const { currentUser, users, onlineUsers } = useUserStore();

  const [open, setOpen] = useState(false);

  const [isCreatingConvo, setIsCreatingConvo] = useState(false);
  const [userToCreateConvo, setUserToCreateConvo] = useState("");

  const navigate = useNavigate();

  async function handleCreateConvo(userId: string) {
    const chatRef = collection(db, "conversation");
    const userChatRef = collection(db, "userChats");

    setIsCreatingConvo(true);
    try {
      // Checks if userChats between the two users exists.
      // Checks if userChats with currentUser.id its conversation has a receiverId already. If does not have, create one. Otherwise, navigate to that conversation.
      const userChatsDoc = doc(userChatRef, currentUser?.id || "");
      const userChatsDocSnap = await getDoc(userChatsDoc);

      if (userChatsDocSnap.exists()) {
        const convo = userChatsDocSnap.data()?.conversation || [];

        // Check if a conversation is already exists
        const existingConvo = convo.find(
          (item: DocumentData) => item.receiverId === userId
        );

        if (existingConvo) {
          // If it is true navigate to that conversation
          navigate(`/home/c/${existingConvo.chatId}`);
          setOpen(!open);
          return;
        }
      }
      // Create a new conversation
      const newChatRef = doc(chatRef); //Generate new conversation document

      // Create a conversation document
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, userId), {
        conversation: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          isSeen: false,
          receiverId: currentUser?.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatRef, currentUser?.id), {
        conversation: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          isSeen: false,
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });

      setOpen(!open);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingConvo(false);
    }
  }

  return (
    <>
      <div className="flex-between items-center border-b px-5 py-3">
        <h3 className="font-semibold">Chats</h3>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          <UsersRound />({onlineUsers.length}){" "}
          {onlineUsers.length <= 1 ? "Online User" : "Online Users"}
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search user" />
        <CommandList>
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup heading="All users">
            {users.map((user) => {
              const { id, username, isOnline } = user;

              const userToCreateConvoWith = userToCreateConvo === id;
              return (
                id !== currentUser?.id && (
                  <CommandItem
                    key={user.id}
                    className="flex-between items-center"
                  >
                    <div className="flex items-center gap-1">
                      <UserAvatar
                        username={username}
                        onlineIndicator={{
                          avail: true,
                          active: isOnline ? true : false,
                        }}
                      />
                      <div>
                        <h3>{username}</h3>
                        <p className="text-xs text-gray-400 font-light">
                          {isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => {
                        handleCreateConvo(id);
                        setUserToCreateConvo(id);
                      }}
                      disabled={userToCreateConvoWith && isCreatingConvo}
                    >
                      {userToCreateConvoWith && isCreatingConvo ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create a conversation"
                      )}
                    </Button>
                  </CommandItem>
                )
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
