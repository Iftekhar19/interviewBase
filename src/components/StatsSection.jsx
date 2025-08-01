"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Award } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Users size={32} className="text-indigo-600" />,
      label: "Active Users",
      value: "12,000+"
    },
    {
      icon: <MessageSquare size={32} className="text-pink-500" />,
      label: "Questions Shared",
      value: "45,000+"
    },
    {
      icon: <Award size={32} className="text-yellow-500" />,
      label: "Job Offers Secured",
      value: "8,500+"
    }
  ];

  return (
    <section className="py-20  px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
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
              className="bg-gradient-to-br from-indigo-50 to-pink-50 p-8 rounded-lg shadow-sm border text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
