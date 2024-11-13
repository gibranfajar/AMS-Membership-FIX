"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import LogoHeader from "@/components/LogoHeader";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  // state untuk input user dan password
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [loading, isLoading] = useState(false);

  // Ambil login dari useAuth
  const { login, user: loggedInUser } = useAuth();

  // handle user input change
  const userChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  // handle password input change
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // handle form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    isLoading(true);

    // Panggil login function dengan user dan password
    try {
      await login(user, password);
      console.log("User logged in:", loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <LogoHeader className="mt-20 mx-20 flex" />
      </div>

      <div className="flex flex-col m-8">
        <p className="text-sm my-6">Masuk menggunakan kredensial anda</p>
        <form action="" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="No Telepon"
            name="user"
            value={user}
            onChange={userChange}
            className="mb-4"
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={passwordChange}
            className="mb-4"
          />

          <p className="text-xs my-6">
            Lupa Password? <Link href="/forgot-password">klik disini</Link>
          </p>

          <Button
            label="MASUK AKUN"
            className="bg-base-accent text-white rounded-full w-full p-2"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
