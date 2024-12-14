"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { uploadPresentPhoto } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Ensure correct Supabase client import

export default function Stage2() {
  const { user } = useAuth(); // Get the logged-in user
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false); // Track if the user has uploaded
  const router = useRouter();

  // Check if the user has already uploaded a photo
  useEffect(() => {
    const checkIfUploaded = async () => {
      if (user) {
        // Check if there's a folder for the user in the 'presents' bucket on Supabase
        const { data, error } = await supabase.storage
          .from("images")
          .list(`presents/${user.id}`);

        if (error) {
          console.error("Error checking for existing uploads:", error.message);
        } else if (data && data.length > 0) {
          // If the user has uploaded a file before, set the flag
          setHasUploaded(true);
        } else {
          // If no upload is found, set to false
          setHasUploaded(false);
        }
      }
    };

    checkIfUploaded();
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Generate a preview URL for the selected image
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Dosya Seçilmedi!");
      return;
    }

    if (!user) {
      setUploadStatus("User is not logged in.");
      return;
    }

    setUploadStatus("Uploading...");

    const result = await uploadPresentPhoto(user.id, selectedFile);

    if (result) {
      setUploadStatus("Upload successful! URL: " + result);
      setHasUploaded(true); // Mark as uploaded
    } else {
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CustomHeader>HEDİYENİ YÜKLE</CustomHeader>

      <Button
        onClick={() => router.push("/welcome")}
        className="w-1/5 m-auto bg-white bg-opacity-40 text-gray-600 hover:text-white border-2 border-gray-300 py-2 px-6 rounded-lg backdrop-blur-md shadow-lg hover:bg-opacity-60 transition-all"
      >
        Anasayfa
      </Button>

      <div className="flex flex-1 justify-center items-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-4">
          {hasUploaded ? (
            <div className="text-center text-gray-700">
              <p>You have already uploaded a photo.</p>
              <p>To update your photo, please contact support.</p>
            </div>
          ) : (
            <>
              {previewURL ? (
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Fotoğraf önizlemesi burada görünecek
                </div>
              )}

              {previewURL && (
                <Button
                  variant="outline"
                  onClick={handleRemoveImage}
                  className="w-full mt-2"
                >
                  Fotoğrafı Kaldır
                </Button>
              )}

              <div className="space-y-4 mt-4">
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  {selectedFile ? "Fotoğrafı Değiştir" : "Fotoğraf Seç"}
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>

                <Button onClick={handleUpload} className="w-full">
                  Fotoğrafı Yükle
                </Button>

                {uploadStatus && <p className="text-center">{uploadStatus}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
