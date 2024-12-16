"use client";

import { useEffect, useState } from "react";
import {
  getUserPresents,
  addPoint,
  finishGame,
  supabase,
} from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import CustomHeader from "@/components/CustomHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BackHome from "@/components/BackHome";
import { checkLocked } from "@/lib/check-locked";

export default function Stage3() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [guesses, setGuesses] = useState<{ [key: string]: string }>({});
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const stageLocked = checkLocked(3);
    if (stageLocked) {
      router.replace("/welcome");
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const presents = await getUserPresents();
        if (!Array.isArray(presents)) {
          throw new Error(
            "Expected an array of presents, but got something else."
          );
        }

        const { data: userList, error } = await supabase
          .from("users")
          .select("id, name, surname, game_played");

        if (error) throw new Error(error.message);

        const currentUser = userList?.find((u) => u.id === user?.id);
        if (currentUser?.game_played) setHasPlayed(true);

        setData(presents);
        setUsers(userList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmitGuess = async (presentId: string) => {
    const guessedId = guesses[presentId];
    const present = data.find((item) => item.id === presentId);
    const correctId = present?.buyer.id;

    if (!guessedId) {
      return;
    }

    if (guessedId === correctId) {
      if (user?.id) {
        try {
          await addPoint(user.id);
        } catch (error) {
          console.error("Error adding points:", error);
        }
      }
    }

    setData((prevData) => {
      const updatedData = prevData.filter((item) => item.id !== presentId);

      // Check if the game should finish
      if (updatedData.length === 0 && user?.id) {
        finishGame(user.id)
          .then(() => setHasPlayed(true))
          .catch((error) => {
            console.error("Error marking game as finished:", error);
          });
      }

      return updatedData;
    });
  };

  return (
    <div className="p-4 min-h-screen">
      <CustomHeader>BU HEDİYEYİ KİM ALDI?</CustomHeader>
      <BackHome />

      {!hasPlayed && (
        <p className="text-center font-semibold text-2xl my-6 bg-white bg-opacity-40 text-gray-800 border-2 border-gray-300 shadow-sm p-4 rounded-lg max-w-2xl mx-auto">
          Hediyeyi satın alanı tahmin et ve gönder gelsin!
        </p>
      )}

      <div className="flex flex-1 justify-center items-center">
        {hasPlayed ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
              <div className="text-center text-gray-700">
                <p className="text-lg font-semibold">Oyunu tamamladın!</p>
                <p>
                  Bir yanlışlık olduğunu düşünüyorsan ekiple iletişime
                  geçebilirsin.
                </p>
                <Button
                  className="w-full mt-4"
                  onClick={() => router.push("/scoreboard")}
                >
                  Skor Tablosunu Görüntüle
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((present) => (
              <div key={present.id}>
                <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition-transform hover:scale-105">
                  <img
                    src={present.photo_url}
                    alt="Present"
                    className="w-64 mx-auto mb-4 rounded-lg shadow-md"
                  />
                  <select
                    onChange={(e) =>
                      setGuesses((prev) => ({
                        ...prev,
                        [present.id]: e.target.value,
                      }))
                    }
                    className="block w-full border p-2 rounded-md text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seç</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.surname}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSubmitGuess(present.id)}
                    className="mt-4 w-full bg-black text-white py-2 rounded-md focus:outline-none focus:ring-2"
                  >
                    Gönder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
