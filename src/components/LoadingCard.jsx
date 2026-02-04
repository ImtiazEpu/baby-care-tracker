import ContentLoader from 'react-content-loader';

export const CardLoader = () => (
  <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
    <ContentLoader
      speed={2}
      width="100%"
      height={200}
      backgroundColor="rgba(99, 102, 241, 0.1)"
      foregroundColor="rgba(139, 92, 246, 0.15)"
      className="dark:opacity-50"
    >
      <rect x="0" y="0" rx="4" ry="4" width="60%" height="24" />
      <rect x="0" y="40" rx="4" ry="4" width="40%" height="16" />
      <rect x="0" y="80" rx="4" ry="4" width="100%" height="60" />
      <rect x="0" y="160" rx="4" ry="4" width="30%" height="32" />
    </ContentLoader>
  </div>
);

export const ListLoader = ({ rows = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="glass-card rounded-xl p-4 border border-white/20 dark:border-white/10">
        <ContentLoader
          speed={2}
          width="100%"
          height={60}
          backgroundColor="rgba(99, 102, 241, 0.1)"
          foregroundColor="rgba(139, 92, 246, 0.15)"
          className="dark:opacity-50"
        >
          <circle cx="30" cy="30" r="20" />
          <rect x="60" y="10" rx="4" ry="4" width="40%" height="16" />
          <rect x="60" y="34" rx="4" ry="4" width="60%" height="12" />
        </ContentLoader>
      </div>
    ))}
  </div>
);

export const HomeLoader = () => (
  <div className="space-y-6">
    {/* Hero skeleton */}
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-500/30 animate-pulse" />
      <div className="h-10 w-64 mx-auto mb-4 rounded-lg bg-gradient-to-r from-indigo-400/20 to-purple-500/20 animate-pulse" />
      <div className="h-5 w-48 mx-auto rounded bg-gray-300/30 dark:bg-gray-600/30 animate-pulse" />
    </div>

    {/* Baby cards skeleton */}
    <div className="grid gap-6 md:grid-cols-2">
      {[1, 2].map((i) => (
        <div key={i} className="glass-card rounded-2xl p-6 border border-white/20 dark:border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-500/30 animate-pulse" />
            <div className="flex-1">
              <div className="h-6 w-32 mb-2 rounded bg-gray-300/30 dark:bg-gray-600/30 animate-pulse" />
              <div className="h-4 w-16 rounded bg-gray-300/20 dark:bg-gray-600/20 animate-pulse" />
            </div>
          </div>
          <div className="glass rounded-xl p-4 mb-4 border border-white/10">
            <div className="h-3 w-12 mb-2 rounded bg-gray-300/20 dark:bg-gray-600/20 animate-pulse" />
            <div className="h-6 w-24 mb-2 rounded bg-gray-300/30 dark:bg-gray-600/30 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded bg-gray-300/20 dark:bg-gray-600/20 animate-pulse" />
              <div className="h-6 w-16 rounded bg-gray-300/20 dark:bg-gray-600/20 animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-full rounded-xl bg-gradient-to-r from-indigo-400/30 to-purple-500/30 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);
