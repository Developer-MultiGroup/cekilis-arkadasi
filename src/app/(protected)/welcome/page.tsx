"use client";

import { useAuth } from "@/context/AuthContext";

export default function Welcome() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={signOut} className="p-2 bg-red-500 text-white rounded">
        Sign Out
      </button>
    </div>
  );
}
