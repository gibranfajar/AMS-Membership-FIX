"use client";

import MenuAccount from "@/components/MenuAccount";
import ModalInputPin from "@/components/ModalInputPin";
import ModalQRCode from "@/components/ModalQrCode";
import ProgressBar from "@/components/PrgressBar";
import TabBar from "@/components/TabBar";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const member = localStorage.getItem("member");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false);
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const { userData, loading, error, fetchUser } = useUserContext();

  useEffect(() => {
    if (member) {
      fetchUser(member);
    }
  }, []);

  const handlePopUpQr = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsShowQr(false);
  };

  const handleCheckPin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === userData?.pin) {
      setIsModalVisible(false);
      setIsShowQr(true);
      setPin("");
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("member");
    router.replace("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Account Information Section */}
      <div className="flex flex-col items-center p-8 bg-base-accent rounded-b-3xl w-full">
        <div className="flex justify-center items-center relative w-full">
          <div className="relative">
            <Image
              src="/images/tier/card-tier.svg"
              alt="TierFi"
              width={250}
              height={250}
              className="logo shadow w-full h-auto"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-start z-10 p-4">
              <span className="text-xs text-white">{userData?.fullName}</span>
              <span className="text-[8px] text-white">MEMBER SEJAK 2021</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span className="text-xs text-white">
                {userData?.tierInfo.tier}
              </span>
              <span className="text-[8px] text-white">TIER ANDA</span>
            </div>
            <div className="absolute inset-0 flex items-end justify-between z-10 p-6">
              <div
                className="bg-white/50 flex px-2 rounded py-1 gap-1 cursor-pointer"
                onClick={() => {}}
              >
                <Image
                  src="/images/graf-up.svg"
                  alt="Grafik"
                  width={10}
                  height={12}
                  className="logo shadow"
                />
                <span className="text-[8px]">RIWAYAT TIER</span>
              </div>
              <div
                className="bg-white/50 flex px-2 rounded py-1 gap-1 cursor-pointer"
                onClick={handlePopUpQr}
              >
                <Image
                  src="/images/qr.svg"
                  alt="Barcode"
                  width={10}
                  height={12}
                  className="logo shadow"
                />
                <span className="text-[8px]">TAMPILKAN ID</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white font-medium my-4 self-start">
          {userData?.fullName}
        </h2>

        <div className="flex justify-between items-center w-full">
          <small className="text-white">
            RP {userData?.tierInfo.amountUpTo} Poin untuk tier selanjutnya
          </small>
          <small className="text-white">75%</small>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentValue={75} maxValue={100} />

        <div className="flex justify-between items-center w-full my-2">
          <small className="text-white">TOTAL POINT</small>
          <small className="text-white text-[10px]">
            100 Poin kadaluarsa pada 25 Desember 2024
          </small>
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-yellow-500 text-lg">
            Rp. {userData?.points}
          </span>
          <Link
            href="/history-point"
            className="text-white text-[10px] underline"
          >
            Riwayat Poin
          </Link>
        </div>
      </div>

      {/* Modal for Input PIN */}
      {isModalVisible && (
        <ModalInputPin
          pin={pin}
          setPin={setPin}
          handleCheckPin={handleCheckPin}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      )}

      {/* Modal for QR code */}
      {isShowQr && <ModalQRCode data={userData} closeModal={closeModal} />}

      {/* Menu Section */}
      <MenuAccount />
      <div className="pb-24">
        <span className="cursor-pointer text-sm" onClick={handleLogout}>
          SIGN OUT
        </span>
      </div>

      {/* tab bar */}
      <TabBar />
    </div>
  );
}
