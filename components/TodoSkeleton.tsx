export default function TodoSkeleton() {
  return (
    <div className="space-y-6">
      {/* Add Todo Form Skeleton */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 rounded border border-gray-200 bg-gray-100 animate-pulse" />
        <div className="w-16 h-10 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Todo Items Skeleton */}
      <ul className="space-y-2">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-2 rounded border border-gray-200 p-2">
            {/* Owner Badge */}
            <div className="w-8 h-6 rounded bg-gray-200 animate-pulse" />
            
            {/* Status Button */}
            <div className="w-16 h-8 rounded bg-gray-200 animate-pulse" />
            
            {/* Title Input */}
            <div className="flex-1 h-8 rounded border border-gray-200 bg-gray-50 animate-pulse" />
            
            {/* Save Button */}
            <div className="w-16 h-8 rounded bg-gray-200 animate-pulse" />
            
            {/* Delete Button */}
            <div className="w-16 h-8 rounded bg-gray-200 animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  )
}
