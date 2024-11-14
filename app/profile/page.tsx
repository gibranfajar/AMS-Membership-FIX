"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useUserDetailContext } from "@/context/UserDetailContext";
import React, { FormEvent, useEffect, useState } from "react";

type MemberInfo = {
  memberID: string;
  fullName: string;
  phone: string;
  email: string;
  province: string;
  provinceID: string;
  city: string;
  cityID: string;
  gender: string;
};

type ApiResponseOption = {
  provincesData: { prov_id: string | number; prov_name: string }[];
  citiesData: {
    city_id: string | number;
    city_name: string;
    prov_id: string | number;
  }[];
};

type Option = { id: string | number; label: string };

export default function Profile() {
  const member = localStorage.getItem("member");
  const [optionsProv, setOptionsProv] = useState<Option[]>([]);
  const [optionsCity, setOptionsCity] = useState<Option[]>([]);
  const [prov, setProv] = useState("");
  const [city, setCity] = useState("");

  const [formData, setFormData] = useState<MemberInfo>({
    memberID: "",
    fullName: "",
    phone: "",
    email: "",
    province: "",
    provinceID: "",
    city: "",
    cityID: "",
    gender: "",
  });

  const { userData, loading, error, fetchUser } = useUserDetailContext();

  useEffect(() => {
    if (member) {
      fetchUser(member);
    }
  }, [fetchUser, member]);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setProv(userData.provinceID);
      setCity(userData.cityID);
    }
  }, [userData]);

  useEffect(() => {
    const fetchDataProvince = async () => {
      const response = await fetch(
        "https://golangapi-j5iu.onrender.com/api/member/mobile/provinces"
      );
      const data: ApiResponseOption = await response.json();
      setOptionsProv(
        data.provincesData.map((item) => ({
          id: item.prov_id,
          label: item.prov_name,
        }))
      );
    };
    fetchDataProvince();
  }, []);

  useEffect(() => {
    if (prov) {
      const fetchDataCity = async () => {
        const response = await fetch(
          `https://golangapi-j5iu.onrender.com/api/member/mobile/cities?provID=${prov}`
        );
        const data: ApiResponseOption = await response.json();
        setOptionsCity(
          data.citiesData.map((item) => ({
            id: item.city_id,
            label: item.city_name,
          }))
        );
      };
      fetchDataCity();
    } else {
      setOptionsCity([]);
    }
  }, [prov]);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.currentTarget as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Edit Profil</h1>
        <p className="text-xs mt-4 mb-8">
          Pastikan data anda diperbaharui dengan benar
        </p>
        <form action="" onSubmit={() => {}}>
          <Input
            label="*No Handphone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mb-4"
          />
          <Input
            label="*Nama Lengkap"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mb-4"
          />
          <Input
            label="*Alamat Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4"
          />
          <Select
            labelSelect="*Provinsi"
            labelOption="Pilih Provinsi"
            options={optionsProv}
            value={prov}
            onChange={(e) => {
              const selectedProv = e.target.value;
              setProv(selectedProv); // Memperbarui state provinsi
              setCity(""); // Mengosongkan kota sebelumnya
              setFormData((prev) => ({
                ...prev,
                province: selectedProv, // Menyimpan provinsi di formData
                city: "", // Mengosongkan kota saat provinsi diubah
              }));
            }}
            className="mb-4"
          />
          <Select
            labelSelect="*Kota"
            labelOption="Pilih Kota"
            options={optionsCity}
            value={city}
            onChange={(e) => {
              const selectedCity = e.target.value;
              setCity(selectedCity); // Memperbarui state kota
              setFormData((prev) => ({
                ...prev,
                city: selectedCity, // Menyimpan kota di formData
              }));
            }}
            className="mb-4"
          />

          <Select
            labelSelect="*Jenis Kelamin"
            labelOption="Pilih Jenis Kelamin"
            options={[
              { id: "PRIA", label: "Laki-laki" },
              { id: "WANITA", label: "Perempuan" },
            ]}
            value={formData.gender}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            className="mb-4"
          />
          <Button
            label="SIMPAN"
            className="bg-base-accent text-white rounded-full w-full p-2 my-6"
          />
        </form>
      </div>
    </div>
  );
}
