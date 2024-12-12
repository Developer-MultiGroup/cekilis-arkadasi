"use client";

import StageCard from "@/components/StageCard";
import { useAuth } from "@/context/AuthContext";
import stages from "@/data/stages";

export default function Welcome() {
  const { user, signOut } = useAuth();

  return (
    <div className="text-center h-screen my-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
      <button onClick={signOut} className="p-2 bg-red-500 text-white rounded mb-6">
        Sign Out
      </button>
      <div className="m-auto w-5/6 grid grid-cols-3 gap-4">
        {stages.map((stage) => (
          <StageCard key={stage.index} index={stage.index} name={stage.name} date={stage.start_date} />
        ))}
      </div>
    </div>
  );
}
