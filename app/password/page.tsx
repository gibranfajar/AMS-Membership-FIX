"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col px-8">
        <div className="flex items-center">
          <Image
            src="/images/arrow-left.svg"
            width={30}
            height={30}
            alt="arrow-left"
            className="w-auto h-auto cursor-pointer"
            onClick={() => window.history.back()}
          />
          <div className="flex-grow flex justify-center">
            <span className="font-medium">Pengaturan Password & PIN</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs my-4">
            Digunakan untuk masuk akun member AMSCORP
          </p>
          <form action="" onSubmit={() => {}}>
            <Input
              label="Password Terkini"
              type="password"
              name="oldpassword"
              value=""
              onChange={() => {}}
              className="mb-4"
            />
            <Input
              label="Password Baru"
              type="password"
              name="password"
              value=""
              onChange={() => {}}
              className="mb-4"
            />
            <Input
              label="Konfirmasi Password Baru"
              type="password"
              name="confirmPassword"
              value=""
              onChange={() => {}}
              className="mb-4"
            />

            <Button
              label="SIMPAN PASSWORD"
              className="bg-base-accent text-white rounded-full w-full p-2 my-6"
            />
          </form>
        </div>
        <hr className="my-2 h-0.5 border-t-0 bg-neutral-200" />
        <div className="">
          <p className="text-xs my-4">Digunakan untuk redeem saat transaksi</p>
          <form action="" onSubmit={() => {}}>
            <Input
              label="PIN Baru"
              type="password"
              name="pin"
              value=""
              onChange={() => {}}
              className="mb-4"
            />
            <Input
              label="Konfirmasi PIN Baru"
              type="password"
              name="confirmPin"
              value=""
              onChange={() => {}}
              className="mb-4"
            />

            <Button
              label="SIMPAN PIN"
              className="bg-base-accent text-white rounded-full w-full p-2 my-6"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
