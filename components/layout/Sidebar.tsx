'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/reports', label: 'Query logs' },
  { href: '/dashboard/models', label: 'Models' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 flex-shrink-0 border-r border-panelBorder bg-panel lg:block">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="relative h-2 w-2 rounded-full bg-amber">
          <span className="absolute inset-0 animate-ping rounded-full bg-amber opacity-60" />
        </div>
        <span className="font-display text-lg font-semibold">Lumen</span>
      </div>

      <nav className="mt-4 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-amber-soft text-amber' : 'text-inkMuted hover:bg-white/5 hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
