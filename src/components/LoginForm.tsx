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
        {isRegister ? "Kayıt Ol" : "Giriş Yap"}
      </h1>
      {isRegister && (
        <>
          <div>
            <Label htmlFor="name">İsim</Label>
            <Input
              id="name"
              type="text"
              placeholder="İsminizi girin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="surname">Soyisim</Label>
            <Input
              id="surname"
              type="text"
              placeholder="Soyisminizi girin"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="photo">Komik Fotoğrafın</Label>
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
        <Label htmlFor="email">E-Posta</Label>
        <Input
          id="email"
          type="email"
          placeholder="E-Posta adresinizi girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Şifre</Label>
        <Input
          id="password"
          type="password"
          placeholder="Şifrenizi girin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        {isRegister ? "Kayıt ol" : "Giriş Yap"}
      </Button>
      <p className="text-sm text-gray-500 text-center">
        {isRegister ? "Zaten hesabın var mı? " : "Hala hesabın yok mu? "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-500 underline"
        >
          {isRegister ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;