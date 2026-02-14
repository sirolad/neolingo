export function RequestPageSkeleton() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-10 shadow-soft border border-neutral-100 dark:border-neutral-800 animate-pulse">
        <div className="space-y-5">
          {/* Source Language - 2 column grid skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-48"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
              <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
            </div>
          </div>

          {/* Word input skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
          </div>

          {/* Part of Speech skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-28"></div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
          </div>

          {/* Meaning skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20"></div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
          </div>

          {/* Related Domains skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
              <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button skeleton */}
      <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"></div>
    </div>
  );
}
