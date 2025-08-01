"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ayesha Khan",
    title: "Frontend Developer @ Paytm",
    image: "/profile_female.png",
    quote:
      "This platform helped me land my first React job. The interview questions were exactly what I needed!"
  },
  {
    name: "Rohit Sharma",
    title: "Full Stack Engineer @ Zoho",
    image: "/profile_male.png",
    quote:
      "I cracked 3 interviews back-to-back thanks to the DSA prep and Node.js questions here."
  },
  {
    name: "Neha Patel",
    title: "SDE Intern @ Amazon",
    image: "/profile_female.png",
    quote:
      "Incredible content and community support. I always recommend it to juniors preparing for interviews."
  },
  {
    name: "Ankit Verma",
    title: "Backend Engineer @ Swiggy",
    image: "/profile_male.png",
    quote:
      "I was impressed by the quality of JavaScript challenges. Helped me polish core concepts."
  },
  {
    name: "Ayesha Khan",
    title: "Frontend Developer @ Paytm",
    image: "/profile_female.png",
    quote:
      "This platform helped me land my first React job. The interview questions were exactly what I needed!"
  },
  {
    name: "Rohit Sharma",
    title: "Full Stack Engineer @ Zoho",
    image: "/profile_male.png",
    quote:
      "I cracked 3 interviews back-to-back thanks to the DSA prep and Node.js questions here."
  },
  {
    name: "Neha Patel",
    title: "SDE Intern @ Amazon",
    image: "/profile_female.png",
    quote:
      "Incredible content and community support. I always recommend it to juniors preparing for interviews."
  },
  {
    name: "Ankit Verma",
    title: "Backend Engineer @ Swiggy",
    image: "/profile_male.png",
    quote:
      "I was impressed by the quality of JavaScript challenges. Helped me polish core concepts."
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pair = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length]
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
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pair.map((user, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border text-left h-full flex flex-col justify-between min-h-[280px]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div>
                <Quote className="text-pink-500 mb-4" />
                <p className="text-gray-700 mb-6 text-sm">"{user.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
