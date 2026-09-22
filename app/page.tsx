import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>
            Track progress and recent activity for your Next.js app.🤣
          </CardDescription>
        </CardHeader>
        <CardContent>
          Your design system is ready. Start building your next component.❤️
        </CardContent>
      </Card>

      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline">Enable</Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
