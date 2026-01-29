import { cn, getStatusColor, getStatusLabel } from '@/lib/utils';

interface BadgeProps {
  status?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ status, variant, children, className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const colorClass = status ? getStatusColor(status) : variants[variant || 'default'];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass,
        className
      )}
    >
      {status ? getStatusLabel(status) : children}
    </span>
  );
}
