import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust imports
import { Input } from "./ui/input";
import Image from "next/image";

interface LoginFormProps {
  onSubmit: (
    email: string,
    password: string,
    name?: string,
    surname?: string
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit(email, password, name, surname);
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
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
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
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-700"
            >
              Surname
            </label>
            <Input
              id="surname"
              type="text"
              placeholder="Enter your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
        </>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
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
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
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
        {isRegister
          ? "Already have an account? "
          : "Don't have an account yet? "}
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
