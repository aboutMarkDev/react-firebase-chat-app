import { db } from "@/lib/firebase";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { create } from "zustand";

interface IUserStore {
  currentUser: DocumentData | null;
  isLoading: boolean;
  fetchCurrentUserInfo: (uid: string) => Promise<void>;
  users: DocumentData[];
  setUsers: (userLists: DocumentData[]) => void;
  onlineUsers: DocumentData[];
  setOnlineUsers: (olUsers: DocumentData[]) => void;
}

const useUserStore = create<IUserStore>()((set) => ({
  currentUser: null,

  isLoading: true,

  fetchCurrentUserInfo: async (uid: string) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      // Get user data by uid
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        set({ currentUser: null, isLoading: false });
        return;
      } else {
        set({ currentUser: docSnap.data(), isLoading: false });

        let data = docSnap.data();
        data.isOnline = true;

        await updateDoc(docRef, data);
      }
    } catch (error) {
      console.error(error);
      return set({ currentUser: null, isLoading: false });
    }
  },

  users: [],

  setUsers: (userLists: DocumentData[]) => {
    set({ users: userLists });
  },

  onlineUsers: [],
  setOnlineUsers: (olUsers: DocumentData[]) => {
    set({ onlineUsers: olUsers });
  },
}));

export default useUserStore;
