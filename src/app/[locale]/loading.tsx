export default function Loading() {
  return (
    <div className="py-24 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-5 w-24 bg-muted rounded-full mx-auto" />
          <div className="h-12 w-3/4 bg-muted rounded-xl mx-auto" />
          <div className="h-6 w-2/3 bg-muted rounded-lg mx-auto" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-7xl mx-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-56 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
