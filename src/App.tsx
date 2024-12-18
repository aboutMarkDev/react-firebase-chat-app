import { Route, Routes } from "react-router-dom";
import Layout from "./root/Layout";
import Welcome from "./root/pages/Welcome";
import SignIn from "./root/pages/SignIn";
import SignUp from "./root/pages/SignUp";
import Home from "./root/pages/Home";
import NotFound from "./root/NotFound";
import { Toaster } from "react-hot-toast";
import InitialUI from "./components/chat/InitialUI";
import Convo from "./components/chat/Convo";
import SidebarChats from "./components/SidebarChats";
import { useMediaQuery } from "usehooks-ts";
import Features from "./root/pages/Features";
import About from "./root/pages/About";

export default function App() {
  const isDesktopView = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Welcome />} />

          {/* Private Route */}
          <Route path="/home" element={<Home />}>
            <Route
              index
              element={isDesktopView ? <InitialUI /> : <SidebarChats />}
            />
            <Route path="/home/c/:chatId" element={<Convo />} />
          </Route>

          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />

          {/* Auth */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{ className: "text-sm font-medium" }}
      />
    </>
  );
}
