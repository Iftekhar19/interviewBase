"use client";
import { motion } from "framer-motion";
import { Code, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: <Code className="w-9 h-9 text-indigo-600 dark:text-indigo-400 drop-shadow-lg group-hover:shadow-indigo-200 dark:group-hover:shadow-indigo-800 transition" />,
    title: "Real Interview Questions",
    description: "Get access to hand-picked, frequently asked questions from top tech companies."
  },
  {
    icon: <Lightbulb className="w-9 h-9 text-yellow-400 dark:text-yellow-300 drop-shadow-lg group-hover:shadow-yellow-200 dark:group-hover:shadow-yellow-800 transition" />,
    title: "Expert Insights",
    description: "Learn how to structure perfect answers and what interviewers look for."
  },
  {
    icon: <Users className="w-9 h-9 text-pink-500 dark:text-pink-400 drop-shadow-lg group-hover:shadow-pink-200 dark:group-hover:shadow-pink-800 transition" />,
    title: "Community Driven",
    description: "Questions shared by job seekers and students to help each other succeed."
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 md:px-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-black mb-5 
                     bg-gradient-to-r from-indigo-600 via-pink-400 to-pink-600 
                     dark:from-indigo-400 dark:via-pink-300 dark:to-pink-500
                     bg-clip-text text-transparent drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Why Choose Us?
        </motion.h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto mb-14 font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.13 }}
        >
          Your shortcut to cracking <span className="text-indigo-600 dark:text-indigo-400 font-bold">front-end</span> &{" "}
          <span className="text-pink-600 dark:text-pink-400 font-bold">back-end</span> interviews — built by devs, for devs.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 
                         shadow-lg border border-indigo-100 dark:border-indigo-800 
                         hover:border-pink-200 dark:hover:border-pink-600 
                         transition-all hover:scale-[1.04] hover:-translate-y-2 hover:shadow-xl
                         before:content-[''] before:absolute before:-inset-1 before:opacity-0 
                         before:rounded-2xl before:bg-gradient-to-r before:from-indigo-200 before:to-pink-200 
                         dark:before:from-indigo-700 dark:before:to-pink-700
                         before:blur-lg before:transition before:duration-300 group-hover:before:opacity-70"
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14 * index, type: "spring" }}
              style={{ overflow: "hidden" }}
            >
              <div className="relative z-10 flex items-center justify-center mb-5">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
