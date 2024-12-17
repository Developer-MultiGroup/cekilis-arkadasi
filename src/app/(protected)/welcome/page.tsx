"use client";

import { useEffect, useState } from "react";
import StageCard from "@/components/StageCard";
import { useAuth } from "@/context/AuthContext";
import stages from "@/data/stages";
import { getUserByEmail } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import CustomHeader from "@/components/CustomHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export default function Welcome() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<{
    name: string;
    surname: string;
    email: string;
    photo_url: string;
  } | null>(null);
  const router = useRouter();

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
    <div className="text-center min-h-screen flex flex-col justify-center items-center">
      <CustomHeader>DMG ÇEKİLİŞ ARKADAŞIN</CustomHeader>
      {userData ? (
        <Card className="text-center">
          <CardContent>
            <img
              src={userData.photo_url}
              alt={`${userData.name} ${userData.surname}`}
              className="w-36 h-36 rounded-full object-cover my-4 m-auto"
            />
            <CardTitle>
              Selam, {userData.name} {userData.surname}!
            </CardTitle>
            <CardContent>{userData.email}</CardContent>
          </CardContent>
          <CardFooter className="flex justify-center items-center mt-6">
            <div className="flex space-x-4">
              <Button
                onClick={signOut}
                className="p-2 text-white rounded bg-red-600 hover:bg-red-700"
              >
                Çıkış Yap
              </Button>

              <Button
                onClick={() => router.push("/scoreboard")}
                className="p-2 text-white rounded"
              >
                Skor Tablosu
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
            <Skeleton className="w-36 h-36 rounded-full mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <div className="flex justify-center space-x-4 mt-6">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      )}

      <div className="m-auto w-5/6 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
