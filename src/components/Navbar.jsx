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
import { User, LogOut, LayoutDashboard, BookOpenText, UserCircle } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const { user, loading } = useAuth();
const hanldeLogout=async ()=>
{
  try {
    await axios.get('/api/users/logout');
    window.location.reload();
  } catch (error) {
    console.log(error?.response?.data?.message||"Unable to log out")
  }
}
  return (
    <header className="w-full backdrop-blur bg-white/80 border-b border-gray-100 shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-[1420px] mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black text-indigo-600 tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent"
        >
          <span>💡</span>InterviewBase
        </Link>

        {/* Right Side */}
        {!loading && (
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/sign-in" >
                  <Button variant="outline" className="cursor-pointer">Sign In</Button>
                </Link>
                <Link href="/sign-up" >
                  <Button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg">Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`bg-gray-100 rounded-full cursor-pointer`}>
                    <User className="w-6 h-6 text-indigo-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 ">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?topic=javascript" className="flex items-center gap-2 cursor-pointer">
                      <BookOpenText size={16} /> Browse Topics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/addquestions" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard size={16} /> Add Questions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile" className="flex items-center gap-2 cursor-pointer">
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
