"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import LogoHeader from "@/components/LogoHeader";
import SuccessMessage from "@/components/SuccessMessage";
import { usePhone } from "@/context/PhoneContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function OtpRegister() {
  const router = useRouter();
  const { setOtp } = usePhone();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const focusNextInput = (index: number) => {
    if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleChange = (e: { target: { value: string } }, index: number) => {
    const val = e.target.value;
    const updatedValues = [...otpValues];
    updatedValues[index] = val;
    setOtpValues(updatedValues);

    if (val.length === 1 && index < inputRefs.length - 1) {
      focusNextInput(index);
    } else if (val.length === 0 && index > 0) {
      focusPreviousInput(index);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const otpInput = otpValues.join("");
    const getOtp = sessionStorage.getItem("otp");
    const getMember = localStorage.getItem("member");

    console.log(getMember);

    // Validate the OTP
    if (getOtp === otpInput) {
      try {
        // Handle OTP validation
        const response = await axios.post(
          `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/validate`,
          { memberID: getMember },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.responseCode === "2002500") {
          localStorage.setItem("member", response.data.loginData.idMember);
          router.push("/home");
        } else {
          console.log("Error OTP:", response.data);
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setOtpValues(["", "", "", "", "", ""]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 3000);
    }
  };

  const handleRecodeOTP = async () => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    setOtp(randomNumber.toString());
    const getPhone = sessionStorage.getItem("phone");

    const response = await axios.post(
      `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/Verify?userAccount=${getPhone}`,
      { randomNumber }
    );

    if (response.data.responseCode === "2002500") {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } else {
      console.log("Error OTP:", response.data);
    }

    setCountdown(30);
    setIsWaiting(true);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          setIsWaiting(false);
          return null;
        }
        return prevCountdown ? prevCountdown - 1 : null;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <LogoHeader className="m-20" />

      {message && <SuccessMessage message="OTP Berhasil dikirim" />}
      {error && <ErrorMessage message="OTP yang anda masukkan salah" />}

      <div className="flex flex-col justify-center items-center m-8">
        <h2 className="text-lg font-bold">Masukan kode OTP</h2>
        <p className="text-xs text-center my-6">
          kode OTP akan dikirmkan melalui WA
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="tel"
                maxLength={1}
                value={otpValues[index]}
                className="border-2 rounded-md border-gray-200 text-center w-10 mx-2 p-2 max-w-screen mt-2 focus:outline-none focus:border-primary"
                onChange={(e) => handleChange(e, index)}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <Button
            label="KIRIM"
            className="bg-base-accent text-white rounded-full w-full p-2"
            loading={loading}
          />

          <p className="text-center text-xs mt-4">
            Tidak menerima kode OTP?{" "}
            {isWaiting ? (
              <span className="text-gray-500">
                Kirim ulang dalam {countdown} detik
              </span>
            ) : (
              <span onClick={handleRecodeOTP} className="cursor-pointer">
                Kirim ulang OTP.
              </span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}