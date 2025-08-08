import React from 'react'
import { Skeleton } from './ui/skeleton'

const FilterSkeleton = () => {
  return (
      
      <div className="flex flex-wrap items-center gap-4 justify-between ">
        <Skeleton className="h-10 w-36" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
  )
}

export default FilterSkeleton