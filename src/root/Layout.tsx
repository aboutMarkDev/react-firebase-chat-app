import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { auth, db } from "@/lib/firebase";
import useUserStore from "@/store/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const {
    setUsers,
    isLoading,
    fetchCurrentUserInfo,
    currentUser,
    setOnlineUsers,
    users,
  } = useUserStore();

  // Checking User Auth
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchCurrentUserInfo(user?.uid || "");
      } else {
        useUserStore.setState({ currentUser: null, isLoading: false });
      }
    });

    return () => {
      unSub();
    };
  }, [fetchCurrentUserInfo]);

  // Fetching All users real-time
  useEffect(() => {
    const usersCollection = collection(db, "users");

    const unSubscribe = onSnapshot(
      usersCollection,
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        // Sort the users from oldest to newest user (oldest user first, recently created last).
        setUsers(userList.sort((a, b) => a.createdAt - b.createdAt));
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, []);

  // Get Online Users
  useEffect(() => {
    if (!currentUser?.id) {
      setOnlineUsers([]);
      return;
    }

    const getOnlineUsers = () => {
      const olUsers = [...users].filter(
        (user) => user.isOnline && user.id !== currentUser?.id
      );
      setOnlineUsers(olUsers);
    };
    getOnlineUsers();
  }, [currentUser?.id, users]);

  return (
    <main className="h-screen flex-between flex-col">
      {isLoading ? <Loader /> : <Outlet />}

      <Footer />
    </main>
  );
}
