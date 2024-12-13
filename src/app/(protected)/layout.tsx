"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if unauthenticated and loading is done
    if (!loading && !user) {
      router.push("/"); // Redirect to the public login page
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (!user) {
    return null; // Prevent rendering of protected content before redirect
  }

  return (<>
  {children}
  </>);
}
