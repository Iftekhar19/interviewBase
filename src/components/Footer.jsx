"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div className="md:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent"
          >
            <span>💡</span>InterviewBase
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Your go-to platform for real interview questions and peer-to-peer
            learning in React, Node, JavaScript, and DSA.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/ask" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Ask a Question
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Browse Topics
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Connect
          </h3>
          <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Github />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Twitter />
            </a>
            <a
              href="mailto:support@interviewninja.com"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Mail />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-500 py-6 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} InterviewBase. All rights reserved.
      </div>
    </footer>
  );
}
