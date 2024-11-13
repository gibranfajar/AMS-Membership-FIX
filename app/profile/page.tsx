"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useFetch from "@/hooks/useFetch";
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

  const { data, loading, error } = useFetch<MemberInfo>(
    "https://golangapi-j5iu.onrender.com/api/member/mobile/profile?memberID=1124537252593",
    "memberData"
  );

  useEffect(() => {
    if (data) {
      setFormData(data);
      setProv(data.provinceID);
      setCity(data.cityID);
    }
  }, [data]);

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
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                prov: e.target.value,
                city: "",
              }))
            }
            className="mb-4"
          />
          <Select
            labelSelect="*Kota"
            labelOption="Pilih Kota"
            options={optionsCity}
            value={city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
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
