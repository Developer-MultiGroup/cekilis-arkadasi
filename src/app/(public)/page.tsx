"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import slugify from "@/lib/slugify";
import { supabase } from "@/lib/supabase";

const Home: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const uploadPhoto = async (file: File, userId: string) => {
    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `users/${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError, data } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  };

  const handleAuth = async (
    email: string,
    password: string,
    name?: string,
    surname?: string,
    profilePicture?: File
  ) => {
    try {
      if (isRegister) {
        // Registration Flow
        const { data: authData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (authData.user) {
          let photoUrl = ""; // Default empty photo URL

          // Handle profile picture upload
          if (profilePicture) {
            const filePath = `users/${authData.user.id}/${profilePicture.name}`;

            const { error: uploadError } = await supabase.storage
              .from("images")
              .upload(filePath, profilePicture);

            if (uploadError) {
              console.error(
                "Error uploading profile picture:",
                uploadError.message
              );
              setError("Error uploading profile picture.");
              return;
            }

            // Get public URL for the uploaded image
            const { data: urlData } = supabase.storage
              .from("images")
              .getPublicUrl(filePath);

            if (urlData?.publicUrl) {
              photoUrl = urlData.publicUrl;
            } else {
              console.error("Error generating public URL for profile picture.");
              setError("Error generating public URL for profile picture.");
              return;
            }
          }

          // Create a slugified username
          const username = name && surname ? slugify(`${name} ${surname}`) : "";

          // Save user data to the database
          const { error: dbError } = await supabase.from("users").upsert([
            {
              id: authData.user.id,
              email,
              name,
              surname,
              username,
              photo_url: photoUrl, // Save the public URL
              has_match: false,
              points: 0,
            },
          ]);

          const { error: matchError } = await supabase.from("matches").upsert([
            {
              id: authData.user.id,
              matched_to: "",
            },
          ]);

          if (dbError) {
            console.error(
              "Error saving user data to the database:",
              dbError.message
            );
            setError("Error saving user data to the database.");
            return;
          }

          if (matchError) {
            console.error(
              "Error creating row in matches table:",
              matchError.message
            );
            setError("Error saving user data to the database.");
            return;
          }

          router.push("/welcome"); // Navigate to the welcome page after successful registration
        }
      } else {
        // Login Flow
        const { data: authData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          console.error("Error during login:", signInError.message);
          setError("Invalid email or password.");
          return;
        }

        router.push("/welcome"); // Navigate to the welcome page after successful login
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
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
