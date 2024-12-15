"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackHome() {
  const router = useRouter();
  return (
    <div className="flex justify-center mb-4">
      <Button
        onClick={() => router.push("/welcome")}
        className="w-1/3 md:w-1/5 mx-auto bg-white bg-opacity-40 text-gray-600 hover:text-white border-2 border-gray-300 py-2 px-6 rounded-lg backdrop-blur-md shadow-lg hover:bg-opacity-60 transition-all"
      >
        Anasayfa
      </Button>
    </div>
  );
}
