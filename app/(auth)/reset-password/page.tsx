"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// interface for password
interface Password {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string[];
}

export default function ResetPassword() {
  const router = useRouter();
  const [errorMessagePassword, setErrorMessagePassword] =
    useState<boolean>(false);
  const [successMessagePassword, setSuccessMessagePassword] =
    useState<boolean>(false);

  // state for password
  const [password, setPassword] = useState<Password>({
    phoneNumber: sessionStorage.getItem("phone") || "",
    password: "",
    confirmPassword: "",
    loading: false,
    error: [],
  });

  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Check if the input is related to password
    setPassword((prevPassword) => {
      const updatedPassword = { ...prevPassword, [name]: value };

      // Check if password and confirmPassword match
      if (name === "password" || name === "confirmPassword") {
        setPasswordMatch(
          updatedPassword.password === updatedPassword.confirmPassword
        );
      }

      return updatedPassword;
    });
  };

  // clear error message after 3 seconds
  setTimeout(() => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      error: [],
    }));
  }, 3000);

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set loading
    setPassword((prevPassword) => ({ ...prevPassword, loading: true }));

    let errors = [];
    if (!password.password) errors.push("Password baru harus diisi");
    if (!password.confirmPassword)
      errors.push("Konfirmasi password baru harus diisi");

    if (errors.length > 0) {
      setPassword((prevPassword) => ({
        ...prevPassword,
        loading: false,
        error: errors,
      }));
      return;
    }

    try {
      const response = await axios.put(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/profile/auth/forgot`,
        password,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // check response status
      if (response.data.responseCode === "2002500") {
        // show success message
        setSuccessMessagePassword(true);
        // remove message after 3 seconds
        setTimeout(() => setSuccessMessagePassword(false), 3000);
      } else if (response.data.responseCode === "4002500") {
        // show error message
        setErrorMessagePassword(true);
        // remove message after 3 seconds
        setTimeout(() => setErrorMessagePassword(false), 3000);
      } else {
        console.error("Terjadi kesalahan pada server");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      // loading false
      setPassword((prevPassword) => ({ ...prevPassword, loading: false }));
      // clear password fields
      setPassword((prevPassword) => ({
        ...prevPassword,
        password: "",
        confirmPassword: "",
        loading: false,
      }));

      setTimeout(() => {
        // redirect to login page
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Atur ulang password</h1>
        {successMessagePassword && (
          <SuccessMessage message="Password berhasil diatur ulang" />
        )}
        <div className="mt-6">
          <form onSubmit={handleSubmitPassword}>
            <Input
              label="Password Baru"
              type="password"
              name="password"
              value={password.password}
              onChange={handleChange}
              className="mb-4"
              error={password.error[0]}
            />
            <Input
              label="Konfirmasi Password Baru"
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleChange}
              error={password.error[1]}
            />

            {passwordMatch === false && (
              <p className="text-red-500 text-xs mt-1">Password tidak cocok.</p>
            )}
            {passwordMatch && password.password && (
              <p className="text-green-500 text-xs mt-1">Password cocok.</p>
            )}

            <Button
              label="SIMPAN PASSWORD"
              className="bg-base-accent text-white rounded-full w-full p-2 my-6"
              loading={password.loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
