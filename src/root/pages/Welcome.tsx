import { Button } from "@/components/ui/button";
import WelcomeHeader from "@/components/WelcomeHeader";
import useUserStore from "@/store/userStore";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  const { currentUser } = useUserStore();

  if (currentUser) {
    return <Navigate to="/home" />;
  }
  return (
    <section className="gap-5 flex flex-col relative">
      <WelcomeHeader />
      <section className="flex max-md:flex-col gap-3 px-3 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="w-full flex-center flex-col space-y-5 p-5"
        >
          <h1 className="text-pretty max-md:text-7xl text-8xl font-semibold w-full max-w-sm">
            It All Begins with<br className="md:hidden"></br> Small
            <br className="md:hidden"></br> Talk.
          </h1>

          <h3 className="w-full max-w-lg text-md font-light text-pretty opacity-70">
            Start chitchatting with friends, family, and new connections! Share
            messages, moments, and memories instantly with a seamless, secure,
            and fun chatting experience.
          </h3>

          <div className="w-full max-w-lg space-x-3">
            <Link to="/sign-in">
              <Button className="rounded-lg" size="lg">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="rounded-lg" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="max-lg:hidden h-[45rem] w-full overflow-hidden p-10"
        >
          <motion.img
            src="/assets/Conversation-pana.png"
            alt="sample pic"
            className="w-full h-full object-contain px-5"
          />
        </motion.div>
      </section>
    </section>
  );
}
