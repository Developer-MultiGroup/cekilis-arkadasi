import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  onSubmit: (
    email: string,
    password: string,
    name?: string,
    surname?: string,
    photoFile?: File
  ) => void;
  error: string;
  isRegister: boolean;
  toggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  error,
  isRegister,
  toggleMode,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit(email, password, name, surname, photoFile || undefined);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 p-4 bg-white shadow rounded"
    >
      <Image
        src="/images/dmg-santa-hat.png"
        alt="DMG logo with santa hat"
        className="mx-auto"
        width={125}
        height={125}
      />
      <h1 className="text-xl font-bold text-gray-700">
        {isRegister ? "Register" : "Login"}
      </h1>
      {isRegister && (
        <>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              type="text"
              placeholder="Enter your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="photo">Profile Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mb-2"
            />
            {photoPreview && (
              <div className="mt-2">
                <Image
                  src={photoPreview}
                  alt="Profile preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        {isRegister ? "Register" : "Login"}
      </Button>
      <p className="text-sm text-gray-500 text-center">
        {isRegister ? "Already have an account? " : "Don't have an account yet? "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-500 underline"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;