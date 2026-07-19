import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lumen — AI Analytics Dashboard',
  description: 'Usage, cost, and performance analytics for your AI model traffic.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
