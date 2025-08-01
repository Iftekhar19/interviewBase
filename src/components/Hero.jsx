"use client";
import { motion } from "framer-motion";
import {
  Atom,
  Database,
  Braces,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative max-h-screen h-full flex flex-col justify-center items-center  overflow-hidden">
      {/* Background Blur Accent */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-300 opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-300 opacity-30 rounded-full blur-2xl -z-10" />

      <motion.div 
        className="text-center px-4 mt-16 md:mt-0"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1, type: "spring" }}
      >
        <motion.h1
          className="text-[2.7rem] md:text-6xl font-extrabold leading-snug mb-6 bg-gradient-to-r from-indigo-600 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          Master <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-pink-600 rounded-full text-white">Interviews</span>
          <br className="hidden md:block" />
          for <span className="text-indigo-600">Node.js</span>, <span className="text-pink-600">React</span>, <span className="text-yellow-500">JS</span>, & <span className="text-purple-600">DSA</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Real-world interview questions & answers curated by developers like you. Elevate your prep, boost your confidence, and land your dream job.
        </motion.p>

        <motion.div
          className="flex justify-center gap-8 mb-10 text-indigo-700/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Atom size={42} className="hover:scale-110 transition-transform duration-200 text-pink-500" title="React.js" />
          <Braces size={42} className="hover:scale-110 transition-transform duration-200 text-yellow-500" title="JavaScript" />
          <Database size={42} className="hover:scale-110 transition-transform duration-200 text-pink-400" title="DSA/DB" />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a 
            href="/ask"
            className="px-7 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Post a Question
          </a>
          <a
            href="/categories"
            className="px-7 py-3 text-lg font-semibold rounded-full border-2 border-indigo-400 text-indigo-700 bg-white shadow hover:bg-indigo-50 hover:scale-105 active:scale-95 transition"
          >
            Browse Topics
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
