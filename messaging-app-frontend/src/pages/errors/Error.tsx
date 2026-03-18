import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import Layout from "@/layouts/Layout";

export const ErrorPage = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  return (
    <>
      {token ? (
        <Layout>
          <div className="flex flex-col items-center justify-center rounded-sm p-4 lg:col-start-2 lg:col-end-3">
            <Card className="w-full max-w-md text-center">
              <CardHeader>
                <CardTitle className="text-muted-foreground mb-4 text-6xl font-bold">
                  404
                </CardTitle>
                <CardTitle className="text-2xl">Page Not Found</CardTitle>
                <CardDescription className="text-lg">
                  The page you're looking for doesn't exist or has been moved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  {token ? (
                    <NavLink to="/chat">Go Back Home</NavLink>
                  ) : (
                    <NavLink to="/">Go Back Home</NavLink>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </Layout>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center rounded-sm p-4 lg:col-start-2 lg:col-end-3">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-muted-foreground mb-4 text-6xl font-bold">
                404
              </CardTitle>
              <CardTitle className="text-2xl">Page Not Found</CardTitle>
              <CardDescription className="text-lg">
                The page you're looking for doesn't exist or has been moved.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                {token ? (
                  <NavLink to="/chat">Go Back Home</NavLink>
                ) : (
                  <NavLink to="/">Go Back Home</NavLink>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
