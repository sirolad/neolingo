export function DictionaryPageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 shadow-soft overflow-hidden animate-pulse"
        >
          <div className="p-6 md:p-8">
            {/* Header skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-2">
                <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            </div>

            {/* Definition skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/6"></div>
            </div>

            {/* Translations skeleton */}
            <div className="space-y-3 mt-6">
              {[1, 2].map(j => (
                <div
                  key={j}
                  className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                  </div>
                  <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
