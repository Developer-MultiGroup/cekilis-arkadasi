"use client";

import { useState, useEffect } from "react";
import CustomHeader from "@/components/CustomHeader";
import { fetchAllUsers } from "@/lib/supabase"; 
import { useAuth } from "@/context/AuthContext"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Scoreboard() {
  const { user } = useAuth(); 
  const [users, setUsers] = useState<any[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      if (data) {
        // Sort users by points in descending order
        const sortedUsers = data.sort((a, b) => b.points - a.points);
        setUsers(sortedUsers);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <CustomHeader>SKOR TABLOSU</CustomHeader>

      <div className="flex justify-center mt-6">
        <Button
          onClick={() => router.push("/welcome")}
          className="w-1/5 bg-white bg-opacity-40 text-gray-600 hover:text-white border-2 border-gray-300 py-2 px-6 mb-8 rounded-lg backdrop-blur-md shadow-lg hover:bg-opacity-60 transition-all"
        >
          Anasayfa
        </Button>
      </div>

      <div className="overflow-x-auto mt-6 text-white">
        <table className="w-1/3 m-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-900">
            <tr>
              <th className="py-3 px-6 text-left">Ad</th>
              <th className="py-3 px-6 text-left">Soyad</th>
              <th className="py-3 px-6 text-left">Puan</th>
            </tr>
          </thead>
          <tbody className="bg-black">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Kullanıcı bulunamadı.
                </td>
              </tr>
            ) : (
              users.map((userData) => (
                <tr
                  key={userData.id}
                  className={`${
                    user && user.id === userData.id
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  <td className="py-3 px-6">{userData.name}</td>
                  <td className="py-3 px-6">{userData.surname}</td>
                  <td className="py-3 px-6">{userData.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
