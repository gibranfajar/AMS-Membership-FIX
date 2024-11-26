"use client";

import Header from "@/components/Header";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

interface Transaction {
  id: number;
  idMember: string;
  invoice: string;
  tanggalTransksi: string;
  idStore: string;
  produk: Product[];
  total: number;
}

interface Product {
  id: number;
  DESKRIPSI: string;
  QTY: number;
  Net: number;
}

export default function HistoryTransaction() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<Transaction[] | null>(null);
  const [detail, setDetail] = useState<Transaction | null>(null);

  const totalQty = detail?.produk.reduce((sum, item) => sum + item.QTY, 0);

  const fetchData = async () => {
    const member = localStorage.getItem("member");
    try {
      const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/transaction/history?memberID=${member}`
      );
      setData(response.data.transactionData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

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
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between cursor-pointer mb-2"
              onClick={() => showModal({ id: item.id })}
            >
              {/* Kolom kiri */}
              <div className="flex flex-col space-y-6">
                {/* Nama toko dan ID */}
                <div className="flex flex-col">
                  <small className="text-xs">{item.idStore}</small>
                  <small className="text-[8px]">{item.invoice}</small>
                </div>
                {/* Tanggal */}
                <h2 className="text-xs mt-1">{item.tanggalTransksi}</h2>
              </div>

              {/* Garis pemisah */}
              <div className="w-px h-16 bg-gray-300"></div>

              {/* Kolom kanan */}
              <div className="flex flex-col items-end">
                <span className="text-xs">Total</span>
                <span className="text-xs">RP {item.total}</span>
              </div>
            </div>
          ))}
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
              <span className="font-bold text-sm">{detail?.idStore}</span>
              <span className="text-xs">{detail?.invoice}</span>
              <span className="text-xs">{detail?.tanggalTransksi}</span>
            </div>

            <hr className="my-4" />

            <div>
              <span className="text-xs font-bold">PRODUK</span>

              {/* Daftar produk */}
              <div className="my-2">
                {detail &&
                  detail.produk.map((item) => (
                    <div className="flex justify-between" key={item.id}>
                      <span className="text-sm w-1/2">{item.DESKRIPSI}</span>
                      <span className="text-xs w-1/4 text-right">
                        {item.QTY}
                      </span>
                      <span className="text-xs w-1/4 text-right">
                        {item.Net}
                      </span>
                    </div>
                  ))}
              </div>

              <hr className="my-4" />

              {/* Total item dan harga */}
              <div className="flex justify-between font-bold">
                <span className="text-sm w-1/2">TOTAL ITEM</span>
                <span className="text-sm w-1/4 text-right">{totalQty}</span>
                <span className="text-sm w-1/4 text-right">
                  {detail?.total}
                </span>
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
