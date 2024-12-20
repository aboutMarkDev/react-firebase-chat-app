import useUserStore from "@/store/userStore";
import { Button } from "./ui/button";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Link, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function HomeHeader() {
  const { currentUser } = useUserStore();

  const { pathname } = useLocation();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Try to fetch the current user and update the isOnline status before logging out
      const userRef = doc(db, "users", currentUser?.id || "");
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      let data = userSnap.data();
      data.isOnline = false;

      await updateDoc(userRef, data);

      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    // Border-b here
    <header className="border-b px-5 py-3 flex-between items-center gap-2">
      <div className="flex items-center gap-2">
        {/* Show the drawer and menu button in tablet to phone view */}

        {pathname !== "/home" && (
          <Link to="/home" className="md:hidden">
            <Button className="rounded-full" variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
        )}

        <div className="flex items-center gap-1">
          <img
            src="/assets/chitchatlogo.png"
            alt=""
            width={50}
            height={50}
            className="rounded-lg"
          />
          <h1 className="max-md:hidden font-semibold">ChitChat!</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-2 overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden">
          <UserAvatar username={currentUser?.username || ""} />
          <h3 className="whitespace-nowrap overflow-hidden text-ellipsis">
            Hi, {currentUser?.username || ""}!
          </h3>
        </div>
        <div className="border-l h-10"></div>
        <Button
          size="sm"
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="animate-spin" />
              Logging out...
            </>
          ) : (
            <>
              <LogOut />
              Logout
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
