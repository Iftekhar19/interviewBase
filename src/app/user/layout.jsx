"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Atom,
  BrainCircuit,
  Code2,
  DatabaseZap,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  ServerCog,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { href: "/user/profile", icon: UserCircle, label: "Profile" },
  { href: "/user/addquestions", icon: PlusCircle, label: "Add Questions" },
  { href: "/user/questions?topic=javascript", icon: Code2, label: "Javascript" },
  { href: "/user/questions?topic=reactjs", icon: Atom, label: "React.js" },
  { href: "/user/questions?topic=nodejs", icon: ServerCog, label: "Node.js" },
  { href: "/user/questions?topic=sql", icon: DatabaseZap, label: "SQL" },
  { href: "/user/questions?topic=dsa", icon: BrainCircuit, label: "DSA" },
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile sidebar state

  return (
    <main className="h-screen w-full max-w-[1480px] bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <Navbar />
      <section className="w-full mx-auto h-[calc(100vh-70px)] flex">
        {/* Sidebar */}
        <aside
          className={`hidden sm:flex flex-col border-r border-gray-200 transition-all duration-300 ${
            collapsed ? "w-[60px]" : "w-[200px]"
          }`}
        >
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="cursor-pointer"
            >
              {collapsed ? (
                <PanelLeftOpen className="w-8 h-8 text-gray-500" />
              ) : (
                <PanelLeftClose className="w-8 h-8 text-gray-500" />
              )}
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {sidebarLinks.map(({ href, icon: Icon, label, danger }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 ${
                  danger ? "text-red-500" : "text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Sheet */}
        <div className="sm:hidden absolute top-4 left-0 z-50">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] bg-gradient-to-b from-indigo-50 via-white to-pink-50"
            >
              <SheetTitle>
                <div className="text-lg font-bold py-5 pl-4 border-b shadow-md border-gray-200 tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent">
                  InterviewBase
                </div>
              </SheetTitle>
              <nav className="flex flex-col gap-3 mt-1">
                {sidebarLinks.map(({ href, icon: Icon, label, danger }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)} // CLOSE SHEET ON CLICK
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-100 ${
                      danger ? "text-red-500" : "text-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-0 sm:p-2 overflow-y-auto">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
