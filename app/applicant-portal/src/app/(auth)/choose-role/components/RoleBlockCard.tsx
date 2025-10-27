import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/shadcn/utils';

import { LucideIcon } from 'lucide-react'; // optional type helper for icons

export function RoleBlock({
  title,
  body,
  onPrimary,
  primary,
  onSecondary,
  secondary,
  selected,
  Icon
}: {
  title: string;
  body: string;
  onPrimary: () => void;
  primary: string;
  onSecondary?: () => void;
  secondary?: string;
  selected?: boolean;
  Icon?: LucideIcon; // optional icon prop
}) {
  return (
    <Card
      onClick={onPrimary}
      className={cn(
        'cursor-pointer border-2 transition-all duration-300 ease-out',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-muted hover:border-primary/40 hover:bg-muted/30'
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          {/* Optional icon */}
          {Icon && (
            <div
              className={cn(
                'mt-0.5 transition-colors duration-300',
                selected ? 'text-accent' : 'text-accent group-hover:text-accent'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
