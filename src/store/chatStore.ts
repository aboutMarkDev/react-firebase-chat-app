import { db } from "@/lib/firebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { create } from "zustand";

interface IUserStore {
  convoId: string | undefined;
}

const useChatStore = create<IUserStore>()((set) => ({
  convoId: "",
}));

export default useChatStore;
