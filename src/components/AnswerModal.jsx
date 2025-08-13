"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownRenderer from "./MarkDownRenderer";

export default function AnswerModal({ isOpen, onClose, title, description }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (isOpen && title) {
      fetchAnswer();
    }
  }, [isOpen, title, description]);

  const fetchAnswer = async () => {
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/generate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      setAnswer(data.message || "No answer found.");
    } catch (error) {
      setAnswer(error.message || "Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader className="px-6 pt-6 pb-2 flex flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            </div>
          ) : (
            <MarkdownRenderer content={answer} />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
