import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/ui/alert";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import Link from 'next/link'

interface ErrorStateAlertProps {
  title: {
    text: string,
    styling?: string,
  };
  description: {
    text: string,
    styling?: string,
  };
  variant?: "default" | "destructive";
  callToAction?: {
    text: string;
    link: string;
  }
}

// Note: this component will not handle ensuring links requiring authentication are checked
export default function ErrorStateAlert({ title, description, variant = "destructive", callToAction }: ErrorStateAlertProps) {
  return (
    <div className="max-w-md w-full space-y-4">
      <Alert variant={variant}>
        <Icons.alert className="h-4 w-4" />
        <AlertTitle className={title.styling}>{title.text}</AlertTitle>
        <AlertDescription className={description.styling}>{description.text}</AlertDescription>
      </Alert>
      
      { callToAction &&
        <div className="flex flex-col gap-2">
            <Button className="w-full">
              <Link href={callToAction.link}>
                {callToAction?.text}
              </Link>
            </Button>
        </div>
      }
    </div>
  );
}