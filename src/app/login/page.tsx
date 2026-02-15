"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@/firebase";
import { signInWithGoogle } from "@/firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Redirect if user is already logged in
    if (!isUserLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(auth);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo.png"
              alt="Inertia Logo"
              width={150}
              height={65}
              className="dark:invert"
            />
          </div>
          <CardTitle className="text-2xl">Join the Club</CardTitle>
          <CardDescription>
            Sign in to join events and connect with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            disabled={isUserLoading}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.8 64.4C305.9 99.8 279.3 84 248 84c-83.6 0-152.2 67.8-152.2 151.4s68.6 151.4 152.2 151.4c97.1 0 134.3-70.8 138.8-105.7H248v-85.3h236.1c2.3 12.7 3.9 26.1 3.9 40.8z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
