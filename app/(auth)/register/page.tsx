"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Link from "next/link";
import React, { useEffect } from "react";

type ApiResponseOption = {
  provincesData: {
    prov_id: string | number;
    prov_name: string;
  }[];

  citiesData: {
    city_id: string | number;
    city_name: string;
    prov_id: string | number;
  }[];
};

type Option = {
  id: string | number;
  label: string;
};

export default function Register() {
  const [optionsProv, setOptionsProv] = React.useState<Option[]>([]);
  const [optionsCity, setOptionsCity] = React.useState<Option[]>([]);
  const [prov, setProv] = React.useState("");
  const [city, setCity] = React.useState("");
  const [gender, setGender] = React.useState("");

  //   fetch data province
  useEffect(() => {
    const fetchDataProvince = async () => {
      try {
        const response = await fetch(
          "https://golangapi-j5iu.onrender.com/api/member/mobile/provinces"
        );
        const data: ApiResponseOption = await response.json();

        // Mapping data API ke format yang sesuai untuk komponen Select
        const formattedOptions = data.provincesData.map((item) => ({
          id: item.prov_id,
          label: item.prov_name,
        }));

        setOptionsProv(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProvince();
  }, []);

  //   fetch data city
  useEffect(() => {
    if (prov) {
      const fetchDataCity = async () => {
        try {
          const response = await fetch(
            `https://golangapi-j5iu.onrender.com/api/member/mobile/cities?provID=${prov}`
          );
          const data: ApiResponseOption = await response.json();

          // Mapping data API ke format yang sesuai untuk komponen Select
          const formattedOptions = data.citiesData.map((item) => ({
            id: item.city_id,
            label: item.city_name,
          }));

          setOptionsCity(formattedOptions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataCity();
    } else {
      setOptionsCity([]);
    }
  }, [prov]);

  const handleSelectProvince = (event: React.FormEvent<HTMLSelectElement>) => {
    setProv(event.currentTarget.value);
  };

  const handleSelectCity = (event: React.FormEvent<HTMLSelectElement>) => {
    setCity(event.currentTarget.value);
  };

  const handleSelectGender = (event: React.FormEvent<HTMLSelectElement>) => {
    setGender(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Daftar Member</h1>
        <p className="text-xs my-4">
          Daftar akun untuk mendapatkan info terbaru tentang promo, koleksi dan
          keuntungan member lainnya.
        </p>
        <form action="" onSubmit={() => {}}>
          <Input
            label="*No Handphone"
            type="text"
            name="nohp"
            value=""
            onChange={() => {}}
            className="mb-4"
          />
          <Input
            label="*Nama Lengkap"
            type="text"
            name="fullName"
            value=""
            onChange={() => {}}
            className="mb-4"
          />
          <Input
            label="*Alamat Email"
            type="email"
            name="email"
            value=""
            onChange={() => {}}
            className="mb-4"
          />
          <Select
            labelSelect="*Provinsi"
            labelOption="Pilih Provinsi"
            options={optionsProv}
            value={prov}
            onChange={handleSelectProvince}
            className="mb-4"
          />
          <Select
            labelSelect="*Kota"
            labelOption="Pilih Kota"
            options={optionsCity}
            value={city}
            onChange={handleSelectCity}
            className="mb-4"
          />
          <Input
            label="*Tanggal Lahir"
            type="date"
            name="birthDate"
            value=""
            onChange={() => {}}
            className="mb-4"
          />
          <Select
            labelSelect="*Jenis Kelamin"
            labelOption="Pilih Jenis Kelamin"
            options={[
              { id: "Laki-laki", label: "Laki-laki" },
              { id: "Perempuan", label: "Perempuan" },
            ]}
            value={gender}
            onChange={handleSelectGender}
            className="mb-4"
          />
          <Input
            label="*Password"
            type="password"
            name="password"
            value=""
            onChange={() => {}}
            className="mb-4"
          />
          <Input
            label="*PIN"
            type="text"
            name="pin"
            value=""
            onChange={() => {}}
            className="mb-4"
          />

          <input type="checkbox" name="allow" className="mb-4" />
          <label className="text-xs ms-2">
            Saya menyetujui{" "}
            <span className="font-medium">Syarat dan ketentuan</span> yang
            berlaku.
          </label>

          <Button
            label="DAFTAR"
            className="bg-base-accent text-white rounded-full w-full p-2"
          />

          <p className="text-center text-xs mt-4">
            Sudah pernah daftar?{" "}
            <Link href="/login" className="font-medium">
              Masuk akun
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
