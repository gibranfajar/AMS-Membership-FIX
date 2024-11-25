"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import { usePhone } from "@/context/PhoneContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const { setPhone, setOtp } = usePhone();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    userAccount: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendPhone = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    // generate otp
    const otp = Math.floor(Math.random() * 900000) + 100000;

    try {
      const response = await axios.post(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/Verify?userAccount=${data.userAccount}`,
        { randomNumber: otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.responseCode === "2002500") {
        setPhone(data.userAccount);
        setOtp(otp.toString());
        router.push(`/otp`);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Error processing OTP:", error);
    } finally {
      setLoading(false);
      setData({ userAccount: "" });
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Atur ulang password</h1>
        {error && <ErrorMessage message="No telepon tidak terdaftar" />}
        <p className="text-xs my-6">
          Masukan email yang terdaftar pada akun anda dan kami akan mengirimkan
          email dengan instruksi untuk mengatur ulang password
        </p>
        <form action="" onSubmit={handleSendPhone}>
          <Input
            label="No Telepon"
            type="text"
            name="userAccount"
            value={data.userAccount}
            onChange={handleChange}
            className="mb-6"
          />

          <Button
            label="KIRIM PERMINTAAN"
            className="bg-base-accent text-white rounded-full w-full p-2"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
