"use client";

import { fetchUser } from "@/actions/userAction";
import Brand from "@/components/Brand";
import Carousel from "@/components/Carousel";
import ModalInputPin from "@/components/ModalInputPin";
import ModalQRCode from "@/components/ModalQrCode";
import TabBar from "@/components/TabBar";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TierInfo = {
  tier: string;
};

type MemberInfo = {
  memberID: string;
  fullName: string;
  phone: string;
  pin: string;
  points: number;
  tierInfo: TierInfo;
};

export default function Home() {
  const member = localStorage.getItem("member");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false);
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.user);

  if (users.loading === true) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (member) {
      fetchUser(dispatch);
    }
  }, [dispatch, member]);

  // const { data, loading, error } = useFetch<MemberInfo>(
  //   `https://golangapi-j5iu.onrender.com/api/member/mobile/dashboard/info?memberID=${member}`,
  //   "memberInfoData"
  // );

  const handlePopUpQr = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsShowQr(false);
  };

  const handleCheckPin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === users.pin) {
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-base-accent min-h-screen">
      <div className="flex justify-between items-center p-8">
        <span className="text-sm text-white">{users.fullName}</span>
        <div className="flex justify-center items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-xs text-white">Tier Kamu</span>
            {users && users.tierInfo ? (
              <span className="text-xs text-white">{users.tierInfo.tier}</span>
            ) : (
              <span className="text-xs text-white">
                Tier information unavailable
              </span>
            )}
          </div>
          <Image
            src="/images/tier/logo-tier.svg"
            width={50}
            height={50}
            alt="logo"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>

      {/* promo section */}
      <div className="px-8 flex flex-col items-end z-10 relative">
        <div className="w-full h-full rounded-lg">
          <Carousel />
        </div>
        <Link href={"/promo"} className="text-xs z-20 mt-2">
          LIHAT SEMUA
        </Link>
      </div>
      <div className="flex flex-col bg-white p-8 pt-28 rounded-t-3xl -top-24 relative">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <span className="text-xs">TOTAL POIN</span>
            <span className="font-medium">Rp. {users.points}</span>
          </div>
          <div
            className="flex items-center justify-center border border-base-accent rounded-lg p-2 gap-2 cursor-pointer"
            onClick={handlePopUpQr}
          >
            <span className="text-xs">Tampilkan QR</span>
            <Image
              src="/images/qr.svg"
              width={50}
              height={50}
              alt="qr"
              className="w-auto h-auto"
            />
          </div>
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
      {isShowQr && <ModalQRCode data={users} closeModal={closeModal} />}

      <div className="flex justify-between items-center p-8 gap-2 bg-white -top-20 relative">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="https://via.placeholder.com/200x200"
            width={50}
            height={50}
            alt="Misi"
            className="w-auto h-auto rounded-md"
          />
          <span className="text-xs">Misi</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="https://via.placeholder.com/200x200"
            width={50}
            height={50}
            alt="Hadiah"
            className="w-auto h-auto rounded-md"
          />
          <span className="text-xs">Hadiah</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="https://via.placeholder.com/200x200"
            width={50}
            height={50}
            alt="Referal"
            className="w-auto h-auto rounded-md"
          />
          <span className="text-xs">Referal</span>
        </div>
        <Link
          href="/promo"
          className="flex flex-col justify-center items-center gap-2"
        >
          <Image
            src="https://via.placeholder.com/200x200"
            width={50}
            height={50}
            alt="Promo"
            className="w-auto h-auto rounded-md"
          />
          <span className="text-xs">Promo</span>
        </Link>

        {/* brand */}
      </div>

      <div className="flex flex-col p-8 gap-2 bg-white -top-20 relative">
        <h2 className="font-medium mb-4">Brand Kami</h2>
        <Brand />
      </div>

      <TabBar />
    </div>
  );
}
