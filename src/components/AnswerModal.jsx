"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownRenderer from "./MarkDownRenderer";

export default function AnswerModal({ isOpen, onClose, title, description }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // console.log(isOpen,title,description)
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
      setAnswer(error.message||"Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="">
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 flex flex-row justify-between items-center">
          <div>
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          </div>
          {/* <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button> */}
        </DialogHeader>

        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <MarkdownRenderer content={answer}/>
            // <p className="text-sm whitespace-pre-wrap">{answer}</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
