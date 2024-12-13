"use client";

import { useEffect, useState } from "react";
import StageCard from "@/components/StageCard";
import { useAuth } from "@/context/AuthContext";
import stages from "@/data/stages";
import { getUserByEmail } from "@/lib/supabase"; // Import the helper function

export default function Welcome() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<{
    name: string;
    surname: string;
    photo_url: string;
  } | null>(null);

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
    <div className="text-center h-screen my-auto">
      {userData ? (
        <>
          <div className="flex flex-col items-center p-4">
            <img
              src={userData.photo_url}
              alt={`${userData.name} ${userData.surname}`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold">
              Welcome, {userData.name} {userData.surname}
            </h1>
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      )}
      <button onClick={signOut} className="p-2 bg-red-500 text-white rounded mb-6">
        Sign Out
      </button>
      <div className="m-auto w-5/6 grid grid-cols-3 gap-4">
        {stages.map((stage) => (
          <StageCard
            key={stage.index}
            index={stage.index}
            name={stage.name}
            date={stage.start_date}
          />
        ))}
      </div>
    </div>
  );
}
