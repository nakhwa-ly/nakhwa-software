import { cn } from '@/lib/utils';

export type ProjectMockupVariant = 'mobile' | 'dashboard' | 'video';

interface ProjectMockupProps {
  variant: ProjectMockupVariant;
  accentFrom: string; // full Tailwind class, e.g. "from-primary"
  accentTo: string;   // full Tailwind class, e.g. "to-accent"
  className?: string;
}

// ── Mobile frame (Pizza Lamia) ──────────────────────────────────────────────
function MobileMockup({ accentFrom, accentTo }: { accentFrom: string; accentTo: string }) {
  return (
    <div className="relative mx-auto aspect-[9/19] w-[130px] rounded-[1.75rem] border-2 border-border bg-card shadow-2xl overflow-hidden flex flex-col">
      {/* Status bar */}
      <div className={cn('h-8 w-full flex-shrink-0 flex items-center justify-between px-3', 'bg-gradient-to-r', accentFrom, accentTo)}>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
        <div className="w-7 h-1.5 rounded-full bg-white/40" />
      </div>

      {/* App header with back arrow + title */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border flex-shrink-0">
        <div className="w-3.5 h-3.5 rounded bg-muted flex-shrink-0" />
        <div className="w-14 h-2 rounded-full bg-foreground/20" />
      </div>

      {/* Menu item cards */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {[58, 48, 53].map((w, i) => (
          <div key={i} className="flex gap-2 p-2 rounded-lg bg-muted/50">
            <div className={cn('w-7 h-7 rounded-md flex-shrink-0 opacity-70 bg-gradient-to-br', accentFrom, accentTo)} />
            <div className="flex-1 space-y-1.5 flex flex-col justify-center min-w-0">
              <div className="h-1.5 rounded-full bg-foreground/25" style={{ width: `${w}%` }} />
              <div className="h-1 rounded-full bg-foreground/15 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart pill at bottom-end — RTL-aware */}
      <div className={cn('absolute bottom-3 end-2 flex items-center gap-1 px-2 py-1 rounded-full shadow-lg bg-gradient-to-r', accentFrom, accentTo)}>
        <div className="w-2.5 h-2.5 rounded-sm bg-white/70" />
        <div className="w-3.5 h-1.5 rounded-full bg-white/60" />
      </div>
    </div>
  );
}

// ── Dashboard frame (Inventory ERP) ────────────────────────────────────────
function DashboardMockup({ accentFrom, accentTo }: { accentFrom: string; accentTo: string }) {
  return (
    <div className="relative mx-auto w-full aspect-[16/10] rounded-xl border-2 border-border bg-card shadow-2xl overflow-hidden flex flex-col">
      {/* Laptop chrome / top bar */}
      <div className="h-6 bg-muted border-b border-border flex items-center px-2 gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-destructive/50" />
        <div className="w-2 h-2 rounded-full bg-accent/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
        <div className="flex-1 mx-2 h-2 rounded-md bg-border" />
      </div>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — logical start side */}
        <div className="w-[22%] bg-muted/40 border-e border-border p-1.5 space-y-1.5 flex-shrink-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-1.5 p-1 rounded',
                i === 0 ? cn('bg-gradient-to-r opacity-90', accentFrom, accentTo) : ''
              )}
            >
              <div className="w-2.5 h-2.5 rounded-sm bg-foreground/20 flex-shrink-0" />
              <div className="h-1.5 flex-1 rounded-full bg-foreground/15 min-w-0" />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-2 space-y-2 overflow-hidden">
          {/* 3 KPI tiles */}
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="p-1.5 rounded-lg bg-muted/50 space-y-1">
                <div className="h-1.5 w-2/3 rounded-full bg-foreground/20" />
                <div className={cn('h-3 w-3/4 rounded bg-gradient-to-r opacity-70', accentFrom, accentTo)} />
              </div>
            ))}
          </div>

          {/* Bar chart — 5 bars with varying heights */}
          <div className="p-2 rounded-lg bg-muted/30 flex items-end gap-1" style={{ height: 56 }}>
            {[60, 40, 80, 55, 70].map((h, i) => (
              <div
                key={i}
                className={cn('flex-1 rounded-t opacity-80 bg-gradient-to-t', accentFrom, accentTo)}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* 3-row table hint */}
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 px-1.5 py-1 rounded bg-muted/30">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 flex-shrink-0" />
                <div className="h-1.5 flex-1 rounded-full bg-foreground/15 min-w-0" />
                <div className="h-1.5 w-8 rounded-full bg-foreground/15 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Video frame (Educational Platform) ─────────────────────────────────────
function VideoMockup({ accentFrom, accentTo }: { accentFrom: string; accentTo: string }) {
  return (
    <div className="relative mx-auto w-full aspect-[16/10] rounded-xl border-2 border-border bg-card shadow-2xl overflow-hidden flex flex-col">
      {/* Browser chrome */}
      <div className="h-7 bg-muted border-b border-border flex items-center px-2.5 gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-destructive/50" />
        <div className="w-2 h-2 rounded-full bg-amber-400/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
        <div className="flex-1 mx-2 h-3 rounded-md bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden flex flex-col">
        {/* Main video tile */}
        <div className={cn('relative flex-1 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br', accentFrom, accentTo, 'opacity-20 dark:opacity-30')}>
          <div className={cn('absolute inset-0 bg-gradient-to-br', accentFrom, accentTo, 'opacity-30')} />
          {/* Play triangle */}
          <svg
            className="relative z-10 w-8 h-8 text-foreground/50"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {/* Live pill — RTL-aware */}
          <div className="absolute top-2 end-2 flex items-center gap-1 bg-destructive/90 text-destructive-foreground rounded-full px-1.5 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[7px] font-bold leading-none tracking-wide">LIVE</span>
          </div>
        </div>

        {/* 3 participant thumbnails */}
        <div className="grid grid-cols-3 gap-1.5 flex-shrink-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-md overflow-hidden aspect-video flex items-center justify-center',
                i === 0
                  ? cn('bg-gradient-to-br opacity-60', accentFrom, accentTo)
                  : 'bg-muted/60'
              )}
            >
              <div className="w-4 h-4 rounded-full bg-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Public component ────────────────────────────────────────────────────────
export function ProjectMockup({ variant, accentFrom, accentTo, className }: ProjectMockupProps) {
  return (
    <div className={cn('w-full h-full flex items-center justify-center p-3', className)}>
      {variant === 'mobile' && <MobileMockup accentFrom={accentFrom} accentTo={accentTo} />}
      {variant === 'dashboard' && <DashboardMockup accentFrom={accentFrom} accentTo={accentTo} />}
      {variant === 'video' && <VideoMockup accentFrom={accentFrom} accentTo={accentTo} />}
    </div>
  );
}
