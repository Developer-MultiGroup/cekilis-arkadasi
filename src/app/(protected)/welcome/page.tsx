"use client";

import { useEffect, useState } from "react";
import StageCard from "@/components/StageCard";
import { useAuth } from "@/context/AuthContext";
import stages from "@/data/stages";
import { getUserByEmail } from "@/lib/supabase"; 
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<{
    name: string;
    surname: string;
    photo_url: string;
  } | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        const { data, error } = await getUserByEmail(user.email);
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setUserData(data);
        }
      }
    };

    fetchUserData();
  }, [user?.email]);

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl py-8" style={{ fontFamily: "TanNimbus" }}>
        DMG ÇEKİLİŞ ARKADAŞIN
      </h1>
      {userData ? (
        <>
          <div className="flex flex-col items-center p-4">
            <img
              src={userData.photo_url}
              alt={`${userData.name} ${userData.surname}`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold">
              Naber, {userData.name} {userData.surname}?
            </h1>
          </div>
        </>
      ) : (
        <>
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
          <Skeleton  className="w-48 h-8 rounded-lg mx-auto mb-4"/>
        </>
      )}
      
      <div className="flex space-x-4 mt-6">
        <Button
          onClick={signOut}
          className="p-2 text-white rounded bg-red-600"
        >
          Çıkış Yap
        </Button>

        <Button
          onClick={() => router.push("/scoreboard")}
          className="p-2 text-white rounded "
        >
          Skor Tablosu
        </Button>
      </div>

      <div className="m-auto w-5/6 grid grid-cols-3 gap-4 mt-6">
        {stages.map((stage) => (
          <StageCard
            key={stage.index}
            index={stage.index}
            name={stage.name}
            date={stage.start_date}
            image={stage.image}
          />
        ))}
      </div>
    </div>
  );
}
