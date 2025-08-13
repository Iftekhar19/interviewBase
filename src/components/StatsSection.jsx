"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Award } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Users size={36} className="text-indigo-500 dark:text-indigo-400" />,
      label: "Active Users",
      value: "12,000+",
    },
    {
      icon: <MessageSquare size={36} className="text-pink-500 dark:text-pink-400" />,
      label: "Questions Shared",
      value: "45,000+",
    },
    {
      icon: <Award size={36} className="text-yellow-500 dark:text-yellow-400" />,
      label: "Job Offers Secured",
      value: "8,500+",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Thousands of Learners
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center items-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 dark:from-indigo-900 dark:via-pink-900 dark:to-yellow-900 mx-auto mb-4 shadow-sm">
                {item.icon}
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{item.value}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
