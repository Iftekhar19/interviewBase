"use client";
import { motion } from "framer-motion";
import { Atom, Database, Braces } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative  min-h-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Blur Accent */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-300/30 dark:bg-pink-500/30 rounded-full blur-2xl -z-10" />

      <motion.div
        className="text-center px-4 mt-16 md:mt-0"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1, type: "spring" }}
      >
        <motion.h1
          className="text-[2.7rem] md:text-6xl font-extrabold leading-snug mb-6 
            bg-gradient-to-r from-indigo-600 via-pink-400 to-pink-600 
            dark:from-indigo-400 dark:via-pink-300 dark:to-pink-500
            bg-clip-text text-transparent drop-shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          Master{" "}
          <span className="px-3 py-1  bg-gradient-to-r from-indigo-600 via-pink-400 to-pink-600 
            dark:from-indigo-400 dark:via-pink-300 dark:to-pink-500
            bg-clip-text text-transparent drop-shadow-xl">
            Interviews
          </span>
          <br className="hidden md:block" />
          for <span className="text-indigo-600 dark:text-indigo-400">Node.js</span>,{" "}
          <span className="text-pink-600 dark:text-pink-400">React</span>,{" "}
          <span className="text-yellow-500 dark:text-yellow-300">JS</span>, &{" "}
          <span className="text-purple-600 dark:text-purple-400">DSA</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Real-world interview questions & answers curated by developers like you.
          Elevate your prep, boost your confidence, and land your dream job.
        </motion.p>

        <motion.div
          className="flex justify-center gap-8 mb-10 text-indigo-700/80 dark:text-indigo-300/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Atom size={42} className="hover:scale-110 transition-transform duration-200 text-pink-500 dark:text-pink-400" title="React.js" />
          <Braces size={42} className="hover:scale-110 transition-transform duration-200 text-yellow-500 dark:text-yellow-300" title="JavaScript" />
          <Database size={42} className="hover:scale-110 transition-transform duration-200 text-pink-400 dark:text-pink-300" title="DSA/DB" />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/user/addquestions"
            className="px-7 py-3 text-lg font-bold rounded-full 
             bg-indigo-600
              text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Post a Question
          </Link>
          <Link
            href="/dashboard?topic=javascript"
            className="px-7 py-3 text-lg font-semibold rounded-full 
              border-2 border-indigo-400 dark:border-indigo-300
              text-indigo-700 dark:text-indigo-300 
              bg-white dark:bg-gray-800 
              shadow hover:bg-indigo-50 dark:hover:bg-gray-700 
              hover:scale-105 active:scale-95 transition"
          >
            Browse Topics
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
