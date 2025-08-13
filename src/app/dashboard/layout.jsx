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
  ServerCog,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { href: "/dashboard?topic=javascript", icon: Code2, label: "JavaScript" },
  { href: "/dashboard?topic=reactjs", icon: Atom, label: "React.js" },
  { href: "/dashboard?topic=nodejs", icon: ServerCog, label: "NodeJs" },
  { href: "/dashboard?topic=sql", icon: DatabaseZap, label: "SQL" },
  { href: "/dashboard?topic=dsa", icon: BrainCircuit, label: "DSA" },
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="h-screen w-full max-w-[1480px] bg-white dark:bg-gray-900">
      <Navbar />
      <section className="w-full mx-auto h-[calc(100vh-70px)] flex">
        {/* Sidebar */}
        <aside
          className={`hidden sm:flex flex-col border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
            collapsed ? "w-[60px]" : "w-[200px]"
          } bg-white dark:bg-gray-900`}
        >
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {collapsed ? (
                <PanelLeftOpen className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              ) : (
                <PanelLeftClose className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              )}
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {sidebarLinks.map(({ href, icon: Icon, label, danger }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 ${
                  danger
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-200"
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
            <SheetTrigger asChild className="">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 ">
                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200 " />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] bg-gradient-to-b from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
            >
              <SheetTitle>
                <div className="text-lg font-bold py-5 pl-4 border-b border-gray-200 dark:border-gray-700 shadow-md tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent">
                  InterviewBase
                </div>
              </SheetTitle>
              <nav className="flex flex-col gap-3 mt-1">
                {sidebarLinks.map(({ href, icon: Icon, label, danger }) => (
                  <Link
                    key={href}
                    href={href}
                     onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 ${
                      danger
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-800 dark:text-gray-200"
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
        <div className="flex-1 p-2 overflow-y-auto bg-white dark:bg-gray-900">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
