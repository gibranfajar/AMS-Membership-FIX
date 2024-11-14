"use client";

import Header from "@/components/Header";
import { useStoreContext } from "@/context/StoreContext";
import Image from "next/image";
import { useEffect, useState } from "react";

type Store = {
  brand: string;
  storeID: string;
  kota: string;
  storeAddress: string;
  noTelpon: string;
  mapStoreUrl: string;
};

export default function Store() {
  const member = localStorage.getItem("member");
  const { storeData, loading, error, fetchStore } = useStoreContext();

  useEffect(() => {
    if (member) {
      fetchStore(member);
    }
  }, [fetchStore]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState<Store | null>(null);

  const showModal = ({ storeID }: { storeID: string }) => {
    storeData?.find((item) => {
      if (item.storeID === storeID) {
        setIsModalVisible(true);
        setDetail(item as any);
        return true;
      }
    });
  };

  const closeModal = () => setIsModalVisible(false);

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const showSearchModal = () => setIsSearchModalVisible(true);
  const closeSearchModal = () => setIsSearchModalVisible(false);

  // Fungsi untuk mendekode HTML entities
  const decodeHTMLEntities = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="bg-base-accent min-h-screen">
      <Header>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs">LOKASI TOKO</span>
          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Image
              src="/images/search.svg"
              alt="Search"
              width={100}
              height={100}
              className="w-auto h-auto cursor-pointer"
              onClick={showSearchModal}
            />
            <Image
              src="/images/filter.svg"
              alt="Filter"
              width={100}
              height={100}
              className="w-auto h-auto cursor-pointer"
            />
          </div>
        </div>
      </Header>

      {/* search open */}
      {isSearchModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-xs">
                Masukan brand atau kota yang anda cari
              </span>
              <button onClick={closeSearchModal} className="text-black">
                &#10005;
              </button>
            </div>
            <div className="flex items-center justify-center mt-2 border border-gray-300 focus:outline outline-1 outline-offset-0 outline-baseaccent">
              <input
                type="text"
                className="w-full px-2 py-1 focus:outline outline-none text-sm"
              />
              <Image
                src="/images/search.svg"
                alt="Search"
                width={100}
                height={100}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center p-4">
        {storeData &&
          storeData.map((location) => (
            <div
              key={location.storeID}
              className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between cursor-pointer mb-4"
              onClick={() => showModal({ storeID: location.storeID })}
            >
              <span className="text-sm">
                {location.brand} {location.kota}
              </span>
              <Image
                src="/images/location.svg"
                alt="location"
                width={100}
                height={100}
                className="w-auto h-auto cursor-pointer"
              />
            </div>
          ))}
      </div>

      {/* modal detail location */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-w-md min-h-screen shadow-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-xs">LOKASI TOKO</span>
              <button onClick={closeModal} className="text-black">
                &#10005;
              </button>
            </div>

            <div className="flex flex-col items-center justify-center my-6">
              <h2 className="font-bold">
                {detail?.brand} {detail?.kota}
              </h2>

              <div
                className="p-4 my-2"
                dangerouslySetInnerHTML={{
                  __html:
                    detail && detail.mapStoreUrl
                      ? decodeHTMLEntities(detail.mapStoreUrl)
                      : "",
                }}
              ></div>

              <div className="flex flex-col items-center justify-center mb-4">
                <span className="text-sm font-semibold">Alamat</span>
                <p className="text-xs text-center my-2">
                  {detail?.storeAddress}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mb-4">
                <span className="text-sm font-semibold mb-2">Jam Toko</span>
                <p className="text-xs">Senin - Sabtu</p>
                <p className="text-xs">10.00 - 22.00</p>
              </div>

              <a
                href="#"
                target="_blank"
                className="text-sm my-2 bg-base-accent w-full py-2 text-center text-white cursor-pointer rounded-full"
              >
                BUKA MAP
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
