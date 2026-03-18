import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BackendLoading = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardContent className="space-y-6 p-8 text-center">
          {/* Loading spinner */}
          <div className="flex justify-center">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
          </div>

          {/* Main loading message */}
          <div className="space-y-3">
            <h2 className="text-foreground text-xl font-semibold">
              Starting up the backend...
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I'm using the free tier on Render, so it takes a moment to wake up
              the backend server. Thanks for your patience! ☕
            </p>
          </div>

          {/* Loading skeleton placeholders */}
          <div className="space-y-3 pt-4">
            <Skeleton className="mx-auto h-4 w-3/4" />
            <Skeleton className="mx-auto h-4 w-1/2" />
            <Skeleton className="mx-auto h-4 w-2/3" />
          </div>

          {/* Additional info */}
          <div className="border-border border-t pt-4">
            <p className="text-muted-foreground text-xs">
              This usually takes 30-60 seconds on first load
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackendLoading;
