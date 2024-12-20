import WelcomeHeader from "@/components/WelcomeHeader";
import { contactUs, futureEnhancements, howItWorks } from "@/utils";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex-grow flex flex-col relative gap-10 bg-background">
      <WelcomeHeader />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="px-8 py-10 space-y-6 w-full max-w-screen-lg mx-auto text-center"
      >
        <h1 className="text-3xl font-semibold">
          Welcome to My Chat Application!
        </h1>
        <p className="font-light text-sm text-foreground/70 leading-relaxed">
          Simple React Chat App is a modern, lightweight platform designed to
          make real-time communication seamless and enjoyable. Whether you’re
          looking to connect with friends, collaborate with colleagues, or
          explore public chat rooms, this app has you covered.
        </p>
      </motion.div>

      {/* How To Use Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-screen-xl mx-auto bg-secondary/30 shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="text-center">
          <h2 className="font-bold text-lg">How to Use?</h2>
          <p className="font-light text-sm text-foreground/70">
            Using this app is as easy as 1-2-3.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {howItWorks.map((how, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary/60 p-4 space-y-1 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-medium">
                {i + 1}. {how.title}
              </h3>
              <p className="font-light text-sm text-foreground/70">
                {how.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Future Enhancements Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full max-w-screen-xl mx-auto bg-secondary/30 shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="text-center">
          <h2 className="font-bold text-lg">Future Enhancements</h2>
          <p className="font-light text-sm text-foreground/70">
            We're constantly working to improve! Here's what's coming soon:
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {futureEnhancements.map((enhancement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary/60 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <p className="font-light text-sm text-foreground/70">
                {enhancement}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Us Section */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="w-full bg-secondary/30 py-8 px-6"
      >
        <div className="w-full max-w-screen-xl mx-auto space-y-4">
          <div className="text-center">
            <h2 className="font-bold text-lg">Contact Us</h2>
            <p className="font-light text-sm text-foreground/70">
              Have feedback, questions, or suggestions? We'd love to hear from
              you! Reach us at:
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {contactUs.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-secondary/60 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between"
              >
                <h3 className="font-semibold text-sm">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="font-light text-xs hover:underline mt-2 md:mt-0"
                >
                  {contact.link}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
