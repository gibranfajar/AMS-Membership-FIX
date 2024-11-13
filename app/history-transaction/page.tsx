"use client";

import Header from "@/components/Header";
import Image from "next/image";
import React, { useState } from "react";

export default function HistoryTransaction() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-base-accent min-h-screen">
      <Header>
        <div className="flex items-center justify-between mt-8">
          <span className="text-xs">RIWAYAT BELANJA</span>
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

      <div className="flex flex-col items-center justify-center p-4">
        <div
          className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between cursor-pointer"
          onClick={showModal}
        >
          {/* Kolom kiri */}
          <div className="flex flex-col space-y-6">
            {/* Nama toko dan ID */}
            <div className="flex flex-col">
              <small className="text-xs">RM103 - MISSISSIPPI</small>
              <small className="text-[8px]">12565A1AD6BF67B</small>
            </div>
            {/* Tanggal */}
            <h2 className="text-xs mt-1">29 DESEMBER 2023</h2>
          </div>

          {/* Garis pemisah */}
          <div className="w-px h-16 bg-gray-300"></div>

          {/* Kolom kanan */}
          <div className="flex flex-col items-end">
            <span className="text-xs">Total</span>
            <span className="text-xs">RP 394.000</span>
          </div>
        </div>
      </div>

      {/* modal detail transaksi */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-w-md min-h-screen shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs">STRUK PEMBELIAN</span>
              <button onClick={closeModal} className="text-black">
                &#10005;
              </button>
            </div>

            <div className="flex flex-col justify-center items-center gap-1 my-6">
              <span className="font-bold text-sm">RM13 - MISSISSIPPI</span>
              <span className="text-xs">12565A1AD6BF67B</span>
              <span className="text-xs">29 Desember 2023</span>
            </div>

            <hr className="my-4" />

            <div>
              <span className="text-xs font-bold">PRODUK</span>

              {/* Daftar produk */}
              <div className="my-2">
                <div className="flex justify-between">
                  <span className="text-sm w-1/2">TS SARKA Baghlaf</span>
                  <span className="text-xs w-1/4 text-right">1</span>
                  <span className="text-xs w-1/4 text-right">240,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm w-1/2">TS U NEEK Lino</span>
                  <span className="text-xs w-1/4 text-right">1</span>
                  <span className="text-xs w-1/4 text-right">145,000</span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Total item dan harga */}
              <div className="flex justify-between font-bold">
                <span className="text-sm w-1/2">TOTAL ITEM</span>
                <span className="text-sm w-1/4 text-right">2</span>
                <span className="text-sm w-1/4 text-right">385,000</span>
              </div>

              <hr className="my-4" />
            </div>

            <div className="text-xs mt-6">
              <p className="mb-4 text-end">
                Harga diatas sudah termasuk PPN 11%
              </p>
              <div className="flex justify-between my-2">
                <span>Reward point</span>
                <span>7,500</span>
              </div>
              <div className="flex justify-between my-2">
                <span>Birthday point</span>
                <span>0</span>
              </div>
              <div className="flex justify-between my-2">
                <span>Special day point</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
