import { Loader2 } from "lucide-react";

export default function FullPageSkeleton() {
  return (
    <div
      className="w-full h-screen flex justify-center items-center 
        bg-white dark:bg-gray-900"
    >
      <Loader2
        className="h-24 w-24 animate-spin 
          text-indigo-600 dark:text-indigo-400"
      />
    </div>
  );
}
