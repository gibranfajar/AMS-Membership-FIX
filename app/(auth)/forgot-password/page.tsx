"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const handleSendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/forgot-password/confirm"); // redirect to confirm page
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Atur ulang password</h1>
        <p className="text-xs my-6">
          Masukan email yang terdaftar pada akun anda dan kami akan mengirimkan
          email dengan instruksi untuk mengatur ulang password
        </p>
        <form action="" onSubmit={handleSendEmail}>
          <Input
            label="Email"
            type="email"
            name="email"
            value=""
            onChange={() => {}}
            className="mb-6"
          />

          <Button
            label="KIRIM PERMINTAAN"
            className="bg-base-accent text-white rounded-full w-full p-2"
          />
        </form>
      </div>
    </div>
  );
}
