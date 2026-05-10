'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function SemesterGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function FolderGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 p-4 space-y-2"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function FileListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-2.5 w-1/3" />
          </div>
          <Skeleton className="w-16 h-8 rounded-md flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <FolderGridSkeleton />
      <div className="pt-2">
        <Skeleton className="h-3 w-24 mb-3" />
        <FileListSkeleton />
      </div>
    </div>
  );
}
