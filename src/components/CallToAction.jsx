"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="py-20 px-6 md:px-20 ">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Share or Learn Real Interview Questions?
        </motion.h2>
        <motion.p
          className="text-md md:text-lg mb-8 max-w-2xl mx-auto text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our vibrant community of developers helping each other succeed — whether you're posting questions or browsing answers.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/ask"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg font-bold rounded-full hover:bg-indigo-700 transition"
          >
            Post a Question <ArrowRight size={18} />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-indigo-600 text-indigo-700 font-semibold rounded-full hover:bg-indigo-100 transition"
          >
            Browse Questions <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
