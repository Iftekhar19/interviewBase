"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          {/* <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent mb-2">InterviewBase</h2> */}
               <Link
                     href="/"
                     className="flex items-center gap-2 text-2xl font-black text-indigo-600 tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent"
                   >
                     {/* Optionally, insert a minimal SVG or Lucide icon here */}
                     <span>💡</span>InterviewBase
                   </Link>
          <p className="text-sm text-gray-600">
            Your go-to platform for real interview questions and peer-to-peer learning in React, Node, JavaScript, and DSA.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/ask">Ask a Question</Link></li>
            <li><Link href="/categories">Browse Topics</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Connect</h3>
          <div className="flex space-x-4 text-gray-600">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="hover:text-indigo-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-indigo-600" />
            </a>
            <a href="mailto:support@interviewninja.com">
              <Mail className="hover:text-indigo-600" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} InterviewBase. All rights reserved.
      </div>
    </footer>
  );
}
