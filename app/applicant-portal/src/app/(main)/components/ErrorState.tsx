import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/ui/alert";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import Link from 'next/link'

interface ErrorStateProps {
  title: {
    text: string,
    styling?: string,
  };
  description: {
    text: string,
    styling?: string,
  };
  variant?: "default" | "destructive";
  primary?: {
    text: string;
    link: string;
  }
}

export default function ErrorState({ title, description, variant = "destructive", primary }: ErrorStateProps) {
  return (
    <div className="max-w-md w-full space-y-4">
      <Alert variant={variant}>
        <Icons.alert className="h-4 w-4" />
        <AlertTitle className={title.styling}>{title.text}</AlertTitle>
        <AlertDescription className={description.styling}>{description.text}</AlertDescription>
      </Alert>
      
      { primary &&
        <div className="flex flex-col gap-2">
            <Button className="w-full">
              <Link href={primary.link}>
                {primary?.text}
              </Link>
            </Button>
        </div>
      }
    </div>
  );
}