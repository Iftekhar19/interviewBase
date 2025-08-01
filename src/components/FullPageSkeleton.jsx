import { Loader2 } from "lucide-react";

export default function FullPageSkeleton() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* Animated pulse logo */}
     
      <Loader2 className="h-24 w-24 animate-spin "/>
    
    </div>
  );
}
