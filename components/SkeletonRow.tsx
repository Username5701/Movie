// components/SkeletonRow.tsx
export default function SkeletonRow() {
  return (
    <div className="py-10 px-4">
      <div className="h-8 w-48 bg-white/10 rounded mb-4 animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="min-w-[160px] aspect-[2/3] bg-white/10 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}