"use client";

import Button from "@/components/Button";
import LogoHeader from "@/components/LogoHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function Otp() {
  const router = useRouter();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

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

    const otpInput = otpValues.join("");
    const getOtp = sessionStorage.getItem("otp");

    // Validate the OTP
    if (getOtp === otpInput) {
      router.push(`/reset-password`);
    } else {
      console.log("Kode OTP yang Anda masukkan salah!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <LogoHeader className="m-20" />

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
          />

          <p className="text-center text-xs mt-4">
            Tidak menerima kode OTP?{" "}
            <Link href="" className="font-medium">
              Kirim ulang OTP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
