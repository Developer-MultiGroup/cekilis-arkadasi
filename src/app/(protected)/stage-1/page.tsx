"use client";

import CountdownTimer from "@/components/CountdownTimer";
import UserCarousel from "@/components/UserCarousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import stages from "@/data/stages";

export default function Stage1() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-middle">
      <h1
        className="text-4xl font-bold text-center py-8"
        style={{ fontFamily: "TanNimbus" }}
      >
        ÇEKİLİŞE KATILANLAR
      </h1>

      <Button
        onClick={() => router.push("/welcome")}
        className="bg-white bg-opacity-40 text-gray-600 hover:text-white border-2 border-gray-300 py-2 px-6 rounded-lg backdrop-blur-md shadow-lg hover:bg-opacity-60 transition-all"
      >
        Anasayfa
      </Button>

      <UserCarousel />
      <div className="font-bold text-2xl">
        <p>Sonraki Aşamaya Kalan</p>
        <CountdownTimer targetDate={stages[1].start_date} />
      </div>
    </div>
  );
}
