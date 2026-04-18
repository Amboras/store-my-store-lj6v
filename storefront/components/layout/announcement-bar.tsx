'use client'

import { useState } from 'react'
import { Zap, Truck, X } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative border-b border-border bg-muted/50">
      <div className="container-custom flex items-center justify-center gap-6 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="hidden sm:inline-flex items-center gap-2">
          <Zap className="h-3 w-3 text-accent" strokeWidth={2} />
          Buy 2 Get 1 Free on VoltPods Pro
        </span>
        <span className="hidden md:inline text-border">|</span>
        <span className="inline-flex items-center gap-2">
          <Truck className="h-3 w-3 text-accent" strokeWidth={2} />
          Free 2-day shipping over $99
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
