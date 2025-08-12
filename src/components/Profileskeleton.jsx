import { Skeleton } from "@/components/ui/skeleton";

export default function Profileskeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Image & Upload Button */}
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-28 w-28 rounded-full" />
        <Skeleton className="h-5 w-40" /> {/* Upload Profile Image */}
        <Skeleton className="h-5 w-32" /> {/* Account Verified */}
      </div>

      {/* Personal Details */}
      <div className="mt-8 border rounded-lg p-6 space-y-4 shadow-sm">
        <Skeleton className="h-6 w-40" /> {/* Title: Personal Details */}

        {/* Username */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-4 w-40" /> {/* Value */}
        </div>

        {/* Email */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-52" />
        </div>

        {/* Phone */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Your Questions by Subject */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-60" /> {/* Section Title */}
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-12 w-12 rounded-full" /> {/* Icon */}
              <Skeleton className="h-4 w-20" /> {/* Label */}
              <Skeleton className="h-4 w-6" /> {/* Count */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
