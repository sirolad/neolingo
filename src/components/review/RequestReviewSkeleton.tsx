export function RequestReviewSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6 shadow-sm animate-pulse"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Title skeleton */}
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                </div>
              </div>

              {/* Meaning skeleton */}
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
              </div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-row md:flex-col gap-2 justify-center min-w-[140px]">
              <div className="h-9 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full"></div>
              <div className="flex gap-2 w-full">
                <div className="h-9 bg-neutral-200 dark:bg-neutral-800 rounded-full flex-1"></div>
                <div className="h-9 bg-neutral-200 dark:bg-neutral-800 rounded-full flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
