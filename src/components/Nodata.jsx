"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileX2 } from "lucide-react";

export default function NoData() {
  return (
    <div className="flex justify-center items-center h-[60vh] px-4">
      <Card className="max-w-md w-full shadow-md border border-dashed border-gray-300 dark:border-gray-700">
        <CardContent className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4">
              <FileX2 className="w-10 h-10 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            No Data Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            We couldn't find any results to show here. Please check back later or try adding new content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
