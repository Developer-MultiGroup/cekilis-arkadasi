"use client";

import { useEffect, useState } from "react";
import {
  getUserPresents,
  addPoint,
  finishGame,
  supabase,
} from "@/lib/supabase"; // Import backend functions
import { useAuth } from "@/context/AuthContext"; // Import Auth Context
import CustomHeader from "@/components/CustomHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BackHome from "@/components/BackHome";
import { checkLocked } from "@/lib/check-locked";

export default function Stage3() {
  const { user } = useAuth(); // Get the current authenticated user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]); // Present data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]); // All users for the dropdown
  const [guesses, setGuesses] = useState<{ [key: string]: string }>({}); // Map of present ID to guessed user ID
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false); // Track if the user has already played
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
        // Fetch presents with buyers
        const presents = await getUserPresents();

        // Make sure the presents are always an array
        if (!Array.isArray(presents)) {
          throw new Error(
            "Expected an array of presents, but got something else."
          );
        }

        // Fetch all users for dropdown options
        const { data: userList, error } = await supabase
          .from("users")
          .select("id, name, surname, game_played");

        if (error) {
          throw new Error(error.message);
        }

        // Check if the current user has already played
        const currentUser = userList?.find((u) => u.id === user?.id);
        if (currentUser?.game_played) {
          setHasPlayed(true);
        }

        setData(presents); // Set presents data only if it's an array
        setUsers(userList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Ensure data is always an array
      }
    };

    fetchData();
  }, [user]);

  const handleGuess = (presentId: string, userId: string) => {
    setGuesses((prev) => ({ ...prev, [presentId]: userId }));
  };

  const handleCheck = async (presentId: string) => {
    const guessedId = guesses[presentId];
    const present = data.find((item) => item.id === presentId);
    const correctId = present?.buyer.id;

    if (guessedId === correctId) {
      setFeedback("Correct!");
      // Check if user.id exists before calling backend functions
      if (user?.id) {
        await addPoint(user.id); // Always add points to the current user
      } else {
        console.error("User is not authenticated, cannot add points.");
      }

      setData((prevData) => prevData.filter((item) => item.id !== presentId)); // Remove the present

      // Check if the game is finished
      if (data.length === 1) {
        if (user?.id) {
          await finishGame(user.id); // Mark the game as played
        } else {
          console.error("User is not authenticated, cannot finish the game.");
        }
      }
    } else {
      setFeedback("Wrong! Try again.");
    }
  };

  // Hide feedback after 3 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount or feedback change
    }
  }, [feedback]);

  return (
    <div className="p-4 min-h-screen">
      <CustomHeader>BU HEDİYEYİ KİM ALDI ?</CustomHeader>
      <BackHome />

      <div className="flex flex-1 justify-center items-center">
        {feedback && (
          <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow-md">
            {feedback}
          </div>
        )}

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
          <div className="">
            {data.length > 0 ? (
              data.map((present) => (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" key={present.id}>
                  <div
                    className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
                  >
                    <img
                      src={present.photo_url}
                      alt="Present"
                      className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-md"
                    />
                    <select
                      onChange={(e) => handleGuess(present.id, e.target.value)}
                      className="block w-full border p-2 rounded-md text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} {user.surname}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleCheck(present.id)}
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Gönder
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                  <div className="text-center text-gray-700">
                    <p className="text-lg font-semibold">
                      Tüm hediyeleri eşledin!
                    </p>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
