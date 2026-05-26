'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function SemesterGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 sm:p-5 space-y-3"
          style={{
            background: '#fffaf5',
            border: '1px solid rgba(235, 224, 212, 0.6)',
            animationDelay: `${i * 80}ms`,
          }}
        >
          <Skeleton className="w-10 h-10 rounded-xl bg-[#f5ebe1]" />
          <Skeleton className="h-4 w-3/4 bg-[#f5ebe1]" />
          <Skeleton className="h-3 w-1/2 bg-[#f5ebe1]" />
        </div>
      ))}
    </div>
  );
}

export function FolderGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-4 space-y-2"
          style={{
            background: '#fffaf5',
            border: '1px solid rgba(235, 224, 212, 0.6)',
            animationDelay: `${i * 60}ms`,
          }}
        >
          <Skeleton className="w-8 h-8 rounded-lg bg-[#f5ebe1]" />
          <Skeleton className="h-3.5 w-full bg-[#f5ebe1]" />
          <Skeleton className="h-3 w-1/2 bg-[#f5ebe1]" />
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
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0 bg-[#f5ebe1]" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4 bg-[#f5ebe1]" />
            <Skeleton className="h-2.5 w-1/3 bg-[#f5ebe1]" />
          </div>
          <Skeleton className="w-16 h-8 rounded-lg flex-shrink-0 bg-[#f5ebe1]" />
        </div>
      ))}
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="space-y-6 p-2">
      <FolderGridSkeleton />
      <div className="pt-2">
        <Skeleton className="h-3 w-24 mb-3 bg-[#f5ebe1]" />
        <FileListSkeleton />
      </div>
    </div>
  );
}
