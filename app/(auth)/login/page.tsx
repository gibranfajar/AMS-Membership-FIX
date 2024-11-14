"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import LogoHeader from "@/components/LogoHeader";
import Link from "next/link";
import { authLogin } from "@/hooks/useAuth";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [inputError, setInputError] = useState<{ [key: string]: string }>({});

  const [data, setData] = useState({
    user: "",
    password: "",
    loading: false,
    error: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};

    if (!data.user) errors.user = "No Telepon tidak boleh kosong";
    if (!data.password) errors.password = "Password tidak boleh kosong";

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(inputError).length > 0) {
      const timer = setTimeout(() => setInputError({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [inputError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    setData((prevData) => ({ ...prevData, loading: true, error: "" }));

    try {
      const response = await authLogin(
        { user: data.user, password: data.password },
        "https://golangapi-j5iu.onrender.com/api/member/mobile/dashboard/login"
      );

      if (response.responseCode == 2002500) {
        localStorage.setItem("member", response.loginData.memberID);
        window.location.href = "/home";
      } else if (response.responseCode == 4002500) {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      } else {
        console.error("Respons tidak terduga:", response);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setData({ user: "", password: "", loading: false, error: "" });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <LogoHeader className="mt-20 mx-20 flex" />
      </div>

      <div className="px-8 pt-8">
        {isError && <ErrorMessage message="No telepon atau password salah!" />}
      </div>

      <div className="flex flex-col m-8">
        <p className="text-sm my-6">Masuk menggunakan kredensial anda</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="No Telepon"
            name="user"
            value={data.user}
            onChange={handleChange}
            error={inputError.user}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="mt-4"
            error={inputError.password}
          />

          <p className="text-xs my-6">
            Lupa Password? <Link href="/forgot-password">klik disini</Link>
          </p>

          <Button
            label="MASUK AKUN"
            className="bg-base-accent text-white rounded-full w-full p-2"
            loading={data.loading}
          />
        </form>
      </div>
    </div>
  );
}
