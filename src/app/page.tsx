"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";

import { supabase } from "@/lib/supabase";

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
        // Registration Flow using Supabase
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        // After registration, create a user record in the database (optional)
        if (data?.user && name && surname) {
          const { error: dbError } = await supabase
            .from("users")
            .upsert([
              {
                id: data.user.id,
                name,
                surname,
                photo_url: "",
                matched_to: "",
                points: 0,
              },
            ]);

          if (dbError) {
            setError("Error creating user record in the database.");
            return;
          }
        }
      } else {
        // Login Flow using Supabase
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError("Invalid email or password.");
          return;
        }
      }

      router.push("/dashboard"); // Navigate to dashboard after success
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
