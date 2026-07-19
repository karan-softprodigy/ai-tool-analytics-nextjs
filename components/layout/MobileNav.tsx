'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/reports', label: 'Logs' },
  { href: '/dashboard/models', label: 'Models' }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-panelBorder px-4 py-2 lg:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${
              isActive ? 'bg-amber-soft text-amber' : 'text-inkMuted'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
