import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** Moved above usage to satisfy no-use-before-define */
export function RoleBlock({
  title,
  body,
  onPrimary,
  primary,
  onSecondary,
  secondary,
}: {
  title: string;
  body: string;
  onPrimary: () => void;
  primary: string;
  onSecondary?: () => void;
  secondary?: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={onPrimary}>{primary}</Button>
          {onSecondary && secondary ? (
            <Button variant="secondary" onClick={onSecondary}>
              {secondary}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
