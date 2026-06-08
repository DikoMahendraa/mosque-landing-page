import { Card } from "@/components/ui/card"

type EventGridSkeletonProps = {
  count?: number
  variant?: "event" | "kajian"
}

export default function EventGridSkeleton({ count = 4, variant = "event" }: EventGridSkeletonProps) {
  if (variant === "kajian") {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="p-6 rounded-2xl animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-4" />
            <div className="h-6 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-full mb-6" />
            <div className="space-y-3 mb-6">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-4 bg-muted rounded w-1/2" />
              ))}
            </div>
            <div className="h-10 bg-muted rounded-xl" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="rounded-2xl overflow-hidden animate-pulse">
          <div className="h-40 sm:h-44 bg-muted" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="space-y-2 pt-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-4 bg-muted rounded w-1/2" />
              ))}
            </div>
            <div className="h-10 bg-muted rounded-xl pt-2" />
          </div>
        </Card>
      ))}
    </div>
  )
}
