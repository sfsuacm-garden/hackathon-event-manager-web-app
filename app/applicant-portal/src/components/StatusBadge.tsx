import { Badge } from '@/components/shadcn/ui/badge';
import { Icons } from '@/lib/icons';
import { JSX } from 'react';

type ApplicationStatus = 'PENDING' | 'REJECTED' | 'ACCEPTED' | 'WAITLISTED'

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  interface StatusConfigInterface {
    label: string;
    icon: JSX.Element | null;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }

  const statusConfig: Record<
    ApplicationStatus,
    StatusConfigInterface
  > = {
    PENDING: { label: 'Pending', icon: null, variant: 'secondary' },
    REJECTED: { label: 'Rejected', icon: null, variant: 'outline' },
    ACCEPTED: {
      label: 'Accepted',
      icon: <Icons.badgeCheck />,
      variant: 'default'
    },
    WAITLISTED: { label: 'Waitlisted', icon: null, variant: 'secondary' }
  };

  const { label, icon, variant } = statusConfig[status];

  return (
    <Badge variant={variant} className={`h-6 px-2 flex items-center gap-1`}>
      {icon}
      {label}
    </Badge>
  );
}
