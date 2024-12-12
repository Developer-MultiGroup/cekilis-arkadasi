"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { createUserDocument } from "@/lib/firebase";

const Home: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleAuth = async (
    email: string,
    password: string,
    name?: string,
    surname?: string
  ) => {
    try {
      if (isRegister) {
        // Registration Flow
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const { user } = userCredential;

        // Create user directory in Firestore
        if (name && surname) {
          await createUserDocument(user.uid, name, surname);
        }
      } else {
        // Login Flow
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard"); // Navigate to dashboard after success
    } catch (err) {
      console.error(err);
      setError(
        isRegister
          ? "Failed to register. Please try again."
          : "Invalid email or password."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <LoginForm
        onSubmit={handleAuth}
        error={error}
        isRegister={isRegister}
        toggleMode={() => setIsRegister(!isRegister)}
      />
    </div>
  );
};

export default Home;
