import React from "react";

export default function CustomHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-4xl font-bold text-center py-8"
      style={{ fontFamily: "TanNimbus" }}
    >
      {children}
    </h1>
  );
}
