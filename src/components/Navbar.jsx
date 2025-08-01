"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Ask a Question", href: "/ask" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="w-full backdrop-blur bg-white/80 border-b border-gray-100 shadow-lg sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo (with optional icon) */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black text-indigo-600 tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent"
        >
          {/* Optionally, insert a minimal SVG or Lucide icon here */}
          <span>💡</span>InterviewBase
        </Link>
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
relative px-1 py-1 text-base font-medium
${pathname === link.href ? "text-indigo-600 font-bold" : "text-gray-700"}
hover:text-indigo-500 transition-colors
after:content-[''] after:block after:h-0.5 after:bg-indigo-400
after:scale-x-0 hover:after:scale-x-100 after:transition-transform
after:origin-left after:mt-0.5
`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            size="sm"
            className="ml-4 bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow hover:from-sky-400 hover:to-fuchsia-500 transition-all"
          >
            Login
          </Button>
        </nav>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-indigo-600" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 pl-4 pt-2 rounded-r-2xl bg-white/95 shadow-2xl backdrop-blur-lg border-none"
            >
              <SheetHeader className="p-0 m-0">
                <SheetTitle className="text-lg font-black text-indigo-600 flex items-center gap-2">
                  <span>💡</span>
                  InterviewBase
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-3 mt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium rounded px-3 py-2 transition
${
  pathname === link.href
    ? "bg-indigo-50 text-indigo-600 font-bold"
    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-500"
}
`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  variant="default"
                  className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow hover:brightness-110 transition-all"
                >
                  Login
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
