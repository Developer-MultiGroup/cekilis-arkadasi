"use client";

import UserCarousel from "@/components/UserCarousel";
import NextStage from "@/components/NextStage";
import BackHome from "@/components/BackHome";
import CustomHeader from "@/components/CustomHeader";

export default function Stage1() {
  return (
    <div className="min-h-screen  px-4">
      <CustomHeader>ÇEKİLİŞE KATILANLAR</CustomHeader>

      <BackHome />

      <UserCarousel />
      <div className="w-5/6 md:w-1/4 mx-auto text-center">
        <NextStage stage={2} mode="card" />
      </div>
    </div>
  );
}
