"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Atom,
  ServerCog,
  Braces,
  DatabaseZap,
  BrainCircuit,
  CircleHelp,
} from "lucide-react";

const iconObject = {
  javascript: <Braces className="w-4 h-4 text-yellow-500" />, // JavaScript
  nodejs: <ServerCog className="w-4 h-4 text-green-600" />, // Node.js
  reactjs: <Atom className="w-4 h-4 text-sky-500" />, // React
  dsa: <BrainCircuit className="w-4 h-4 text-indigo-500" />, // DSA
  sql: <DatabaseZap className="w-4 h-4 text-pink-600" />, // SQL
};

const levelColorObject = {
  easy: "text-green-500 dark:text-green-400",
  medium: "text-orange-400 dark:text-orange-300",
  hard: "text-red-400 dark:text-red-300",
};

export default function QuestionViewModal({ open, onClose, data }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {data?.title || "Untitled Question"}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Detailed view of the selected question
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2 bg-gray-200 dark:bg-gray-700" />

        <div className="grid gap-4 text-sm">
          <div className="flex justify-between capitalize">
            <span className="font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Company:
            </span>
            <span>{data?.askedIn}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              Subject:
            </span>
            <span className="capitalize flex items-center gap-1">
              {iconObject[data?.subject?.toLowerCase()] || (
                <CircleHelp className="w-4 h-4" />
              )}
              {data?.subject}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Experience:
            </span>
            <span className="capitalize">{data?.for}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Level:
            </span>
            <Badge
              className={`capitalize ${levelColorObject[data?.level]}`}
              variant="outline"
            >
              {data?.level}
            </Badge>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium block mb-1">Description:</span>
            <p className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-gray-700 dark:text-gray-400">
              {data?.description || "NA"}
            </p>
          </div>
        </div>

        <div className="mt-6 text-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
