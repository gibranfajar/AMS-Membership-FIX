"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Confirm() {
  const router = useRouter();
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Periksa email anda</h1>
        <p className="text-xs mt-6">
          Kami telah mengirimkan instruksi atur ulang password ke email anda.
        </p>
        <div className="flex justify-center items-center">
          <Image
            src="/images/send.svg"
            alt="send"
            width={80}
            height={80}
            className="my-8"
          />
        </div>
        <p className="text-xs mb-6">
          Kami telah mengirimkan instruksi atur ulang password ke email anda.
        </p>

        <Button
          type="submit"
          label="KEMBALI KE BERANDA"
          className="bg-base-accent text-white rounded-full w-full p-2"
          onClick={() => {
            router.replace("/");
          }}
        />
      </div>
    </div>
  );
}
