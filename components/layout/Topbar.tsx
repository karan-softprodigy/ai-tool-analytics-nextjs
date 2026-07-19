export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-panelBorder px-6">
      <div>
        <h1 className="font-display text-lg font-semibold">{title}</h1>
        {subtitle && <p className="text-xs text-inkMuted">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-panelBorder px-3 py-1.5 text-xs text-inkMuted">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
        All systems operational
      </div>
    </header>
  );
}
