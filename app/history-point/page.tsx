"use client";

import Header from "@/components/Header";
import Image from "next/image";

export default function HistoryPoint() {
  return (
    <div className="bg-base-accent min-h-screen">
      <Header>
        <div className="flex items-center justify-between mt-8">
          <span className="text-xs">RIWAYAT POIN</span>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/filter.svg"
              alt="Filter"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
            <span className="text-xs">FILTER</span>
          </div>
        </div>
      </Header>

      <div className="flex flex-col items-center p-4">
        <div className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <small className="text-xs">RM103 - MISSISSIPPI</small>
              <small className="text-[8px]">12565A1AD6BF67B</small>
            </div>
            <h2 className="text-xs mt-1">29 DESEMBER 2023</h2>
          </div>

          <div className="w-px h-16 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <span className="text-sm">+7.880</span>
            <span className="text-xs">POIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
