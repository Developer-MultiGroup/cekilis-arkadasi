"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserCarousel from "@/components/UserCarousel";
import NextStage from "@/components/NextStage";
import BackHome from "@/components/BackHome";
import CustomHeader from "@/components/CustomHeader";
import { checkLocked } from "@/lib/check-locked"; // Import the checkLocked function

export default function Stage1() {
  const router = useRouter();

  useEffect(() => {
    const stageLocked = checkLocked(1); // Check if Stage 1 is locked (pass the stage index)

    if (stageLocked) {
      router.replace("/welcome"); // Redirect to welcome if locked
    }
  }, [router]);

  return (
    <div className="min-h-screen px-4">
      <CustomHeader>ÇEKİLİŞE KATILANLAR</CustomHeader>

      <BackHome />

      <UserCarousel />
      <div className="w-5/6 md:w-1/4 mx-auto text-center mb-8">
        <NextStage stage={2} mode="card" />
      </div>
    </div>
  );
}
