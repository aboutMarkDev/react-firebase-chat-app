import useUserStore from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";
import HomeHeader from "@/components/HomeHeader";
import SidebarChats from "@/components/SidebarChats";
import { useMediaQuery } from "usehooks-ts";

export default function Home() {
  const { currentUser } = useUserStore();

  const isDesktopView = useMediaQuery("(min-width: 768px)");

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex-grow flex justify-center text-sm overflow-hidden p-3">
      <section className="border w-full max-w-screen-2xl rounded-xl flex flex-col overflow-hidden bg-background">
        {/* Header */}
        <HomeHeader />

        <div className="flex-grow flex overflow-hidden">
          {/* Available Conversations */}
          {isDesktopView && <SidebarChats />}

          {/* Conversation */}
          <Outlet />
        </div>
      </section>
    </main>
  );
}
