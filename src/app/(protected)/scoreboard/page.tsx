"use client";

import { useState, useEffect } from "react";
import CustomHeader from "@/components/CustomHeader";
import { fetchAllUsers } from "@/lib/supabase"; 
import { useAuth } from "@/context/AuthContext"; 
import BackHome from "@/components/BackHome";

export default function Scoreboard() {
  const { user } = useAuth(); 
  const [users, setUsers] = useState<any[]>([]); 

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

      <BackHome/>

      <div className="overflow-x-auto mt-6 text-white">
        <table className="w-1/3 m-auto shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="py-3 px-6 text-left">Ad</th>
              <th className="py-3 px-6 text-left">Soyad</th>
              <th className="py-3 px-6 text-left">Puan</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
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
                      ? "text-orange-500 animate-pulse"
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
