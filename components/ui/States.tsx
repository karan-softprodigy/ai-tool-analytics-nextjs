export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-inkMuted">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-amber"
        role="status"
        aria-label={label}
      />
      <p className="font-mono text-xs uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-3 w-1/3 rounded bg-white/5" />
      <div className="h-7 w-1/2 rounded bg-white/5" />
      <div className="h-3 w-1/4 rounded bg-white/5" />
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      {description && <p className="max-w-sm text-sm text-inkMuted">{description}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string | null; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-rose/20 bg-rose/5 py-16 text-center">
      <h3 className="font-display text-base font-semibold text-rose">Something went wrong</h3>
      <p className="max-w-sm text-sm text-inkMuted">{message || 'This data could not be loaded.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-md bg-ink px-4 py-2 text-sm font-medium text-base hover:bg-ink/90"
        >
          Retry
        </button>
      )}
    </div>
  );
}
