"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function TableSkeleton() {
  return (
    <div className="p-2 sm:p-4">
      {/* Table Skeleton */}
      <Card className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-700 dark:text-gray-300">Title</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Company</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Subject</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Experience</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Level</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Description</TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <TableCell>
                  <Skeleton className="h-4 w-[160px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[70px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[160px] bg-gray-200 dark:bg-gray-700" />
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-10 w-36 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
