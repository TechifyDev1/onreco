import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

const STATUS_PILL: Record<
  'connected' | 'disconnected' | 'soon',
  { label: string; cls: string; icon: typeof CheckCircle2 }
> = {
  connected: {
    label: 'Connected',
    cls: 'bg-primary/10 text-primary',
    icon: CheckCircle2,
  },
  disconnected: {
    label: 'Disconnected',
    cls: 'bg-surface-container-high text-on-surface-variant',
    icon: Clock,
  },
  soon: {
    label: 'Coming soon',
    cls: 'bg-surface-container-high text-on-surface-variant',
    icon: Sparkles,
  },
};
export default function StatusPill({
  status,
}: {
  status: 'connected' | 'disconnected' | 'soon';
}) {
  const p = STATUS_PILL[status];
  const Icon = p.icon;
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ' +
        p.cls
      }
    >
      <Icon className="w-3 h-3" strokeWidth={2.5} />
      {p.label}
    </span>
  );
}
