type Variant = 'info' | 'warning' | 'critical' | 'success' | 'neutral';

const VARIANT_CLASSES: Record<Variant, string> = {
  info: 'bg-teal-soft text-teal',
  warning: 'bg-amber-soft text-amber',
  critical: 'bg-rose/10 text-rose',
  success: 'bg-teal-soft text-teal',
  neutral: 'bg-white/5 text-inkMuted'
};

export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode; variant?: Variant }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${VARIANT_CLASSES[variant]}`}>
      {children}
    </span>
  );
}
