"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  LogOut,
  LayoutDashboard,
  BookOpenText,
  UserCircle,
  Sun,
  Moon,
  Laptop
} from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { user, loading } = useAuth();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hanldeLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      window.location.reload();
    } catch (error) {
      console.log(error?.response?.data?.message || "Unable to log out");
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <header className="w-full backdrop-blur bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-[1420px] mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight"
        >
          <span className="dark:text-white text-indigo-600 p-2 rounded-full md:hidden">IB</span><span className="hidden md:inline-block">InterviewBase</span>
        
        </Link>

        {/* Right Side */}
        {!loading && (
          <div className="flex items-center gap-1 md:gap-4 cursor-pointer">
            {/* Theme Switch */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              {theme === "light" && <Sun size={16} />}
              {theme === "dark" && <Moon size={16} />}
              {theme === "system" && <Laptop size={16} />}
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>

            {!user ? (
              <>
                <Link href="/sign-in" className="">
                  <Button variant="outline" className="cursor-pointer p-2">

                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="cursor-pointer bg-indigo-600 text-white shadow-lg p-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer`}
                  >
                    <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard?topic=javascript"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpenText size={16} /> Browse Topics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/user/addquestions"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard size={16} /> Add Questions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/user/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <UserCircle size={16} /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={hanldeLogout}
                    className="flex items-center gap-2 text-red-500 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
