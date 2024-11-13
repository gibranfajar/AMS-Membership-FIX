"use client";

import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import React, { useState } from "react";

type PromoData = {
  id: number;
  imageTitle: string;
  imageSubTitle: string;
  imageUrl: string;
  promoTitle: string;
  promoDetail: string;
  promoEndDate: string;
};

export default function Promo() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState<PromoData | null>(null);

  const { data, loading, error } = useFetch<PromoData[]>(
    "https://golangapi-j5iu.onrender.com/api/member/mobile/promo/list?memberID=1124537252593",
    "promoData"
  );

  const showModal = ({ id }: { id: number }) => {
    data?.find((item) => {
      if (item.id === id) {
        setIsModalVisible(true);
        setDetail(item);
        return true;
      }
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="bg-base-accent min-h-screen">
      <Header>
        <div className="flex items-center justify-between mt-8">
          <span className="text-xs">PROMO BERLAKU</span>
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Image
              src="/images/filter.svg"
              alt="Filter"
              width={100}
              height={100}
              className="w-auto h-auto cursor-pointer"
            />
            <span className="text-xs">FILTER</span>
          </div>
        </div>
      </Header>

      {/* card */}
      <div className="p-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-white w-full rounded-lg flex flex-col items-center justify-between cursor-pointer mb-4"
            onClick={() => showModal({ id: item.id })}
          >
            <Image
              src={`https://web.amscorp.id:3060/imagestorage/promo/${item.imageUrl}`}
              alt="reward"
              width={1240}
              height={1240}
              className="w-auto h-auto rounded-t-lg"
            />
            <div className="flex justify-between items-center w-full p-4 rounded-b-lg">
              <Countdown targetDate={item.promoEndDate} />
              <span className="text-xs">GUNAKAN</span>
            </div>
          </div>
        ))}
      </div>

      {/* open modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-w-md min-h-screen shadow-lg">
            <div className="flex justify-between items-center p-6">
              <span className="text-xs">REWARD KAMU</span>
              <button onClick={closeModal} className="text-black">
                &#10005;
              </button>
            </div>

            <Image
              src={`https://web.amscorp.id:3060/imagestorage/promo/${detail?.imageUrl}`}
              alt="reward"
              width={1240}
              height={1240}
              className="logo"
            />

            <div className="p-4">
              <h2 className="font-bold text-center my-3">
                {detail?.promoTitle}
              </h2>

              {/* Daftar produk */}
              <div className="my-6">
                <div className="border border-gray-300 p-4 rounded-lg mb-4">
                  <div className="flex flex-col mb-4">
                    <span className="text-xs text-zinc-400">Voucher Code</span>
                    <span className="text-sm">KMZWAY87AA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">Voucher can be use at:</span>
                    <span className="text-xs">Semua brand</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Terms & Condition
                  </span>
                  <ol className="text-xs my-2">
                    <li>Lorem ipsum dolloret sit amet bla bla..</li>
                    <li>Voucher discount hanya dapat digunakan satu kali</li>
                    <li>Voucher discount hanya dapat digunakan satu kali</li>
                    <li>Voucher discount hanya dapat digunakan satu kali</li>
                    <li>Voucher discount hanya dapat digunakan satu kali</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
