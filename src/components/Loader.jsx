"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[60vh] px-4">
      <Card className="max-w-sm w-full shadow-md border border-gray-200 dark:border-gray-800">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 animate-bounce"></span>
          </div>
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500" />
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Loading content, please wait...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
