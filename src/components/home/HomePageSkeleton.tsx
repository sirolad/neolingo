export function HomePageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
      {/* Left Column - Main Cards Skeleton */}
      <div className="space-y-6 md:space-y-8">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft overflow-hidden animate-pulse"
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* Header skeleton */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
                </div>
              </div>

              {/* Word display skeleton */}
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 md:p-8 mb-4 md:mb-6">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mx-auto"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-12 md:h-14 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column - Leaderboard Skeleton */}
      <div className="lg:sticky lg:top-8 lg:h-fit space-y-6 md:space-y-8">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft overflow-hidden animate-pulse">
          <div className="p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
              <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            </div>

            {/* Leaderboard items */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
