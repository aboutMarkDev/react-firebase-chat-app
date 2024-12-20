import WelcomeHeader from "@/components/WelcomeHeader";
import { motion } from "framer-motion";
import { features } from "@/utils/index";

export default function Features() {
  const parentVariants = {
    hidden: {}, // No initial state needed for parent itself
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Child animations
  const articleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col relative gap-5 bg-background">
      <WelcomeHeader />
      <div className="px-5 space-y-3 overflow-x-hidden">
        {features.map((f, i) => {
          const { title, description, image } = f;

          const isEven = i % 2 === 0;
          return (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={parentVariants}
              className="h-[50rem] flex max-md:flex-col group overflow-hidden"
              key={i}
            >
              <motion.article
                variants={articleVariants}
                className="flex-1 flex-center flex-col gap-2 px-3 py-5 space-y-3 text-center"
              >
                <h1 className="text-5xl max-sm:text-2xl font-semibold">
                  {title}
                </h1>
                <p className="w-full max-w-3xl max-sm:text-sm text-pretty font-light">
                  {description}
                </p>
              </motion.article>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    ...(isEven ? { x: 50 } : { x: -50 }),
                  },
                  visible: {
                    opacity: 1,
                    x: 0,

                    transition: {
                      delay: 0.3,
                      duration: 0.5,
                    },
                  },
                }}
                className="flex-1 max-md:h-96 max-xl:h-[36rem] max-xl:my-auto md:group-even:order-first flex-center overflow-hidden md:py-10"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
