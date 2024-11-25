"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { usePhone } from "@/context/PhoneContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";

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
  const router = useRouter();
  const [optionsProv, setOptionsProv] = useState<Option[]>([]);
  const [optionsCity, setOptionsCity] = useState<Option[]>([]);
  const [prov, setProv] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setOtp } = usePhone();

  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    email: "",
    province: "",
    city: "",
    dateofBirth: "",
    gender: "",
    password: "",
    pin: "",
    minatKategori: "-",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    field: "province" | "city" | "gender"
  ) => {
    const value = event.target.value;
    if (field === "province") setProv(value);
    else if (field === "city") setCity(value);
    else setGender(value);

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  useEffect(() => {
    const fetchDataProvince = async () => {
      try {
        const response = await fetch(
          "https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/provinces"
        );
        const data: ApiResponseOption = await response.json();
        setOptionsProv(
          data.provincesData.map((item) => ({
            id: item.prov_id,
            label: item.prov_name,
          }))
        );
      } catch (error) {
        console.log("Error fetching province data:", error);
      }
    };
    fetchDataProvince();
  }, []);

  useEffect(() => {
    if (prov) {
      const fetchDataCity = async () => {
        try {
          const response = await fetch(
            `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/cities?provID=${prov}`
          );
          const data: ApiResponseOption = await response.json();
          setOptionsCity(
            data.citiesData.map((item) => ({
              id: item.city_id,
              label: item.city_name,
            }))
          );
        } catch (error) {
          console.log("Error fetching city data:", error);
        }
      };
      fetchDataCity();
    } else {
      setOptionsCity([]);
    }
  }, [prov]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.phone) errors.phone = "No Handphone tidak boleh kosong";
    if (!formData.fullName) errors.fullName = "Nama Lengkap tidak boleh kosong";
    if (!formData.email) errors.email = "Alamat Email tidak boleh kosong";
    if (!formData.province) errors.province = "Provinsi tidak boleh kosong";
    if (!formData.city) errors.city = "Kota tidak boleh kosong";
    if (!formData.dateofBirth)
      errors.dateofBirth = "Tanggal Lahir tidak boleh kosong";
    if (!formData.gender) errors.gender = "Jenis Kelamin tidak boleh kosong";
    if (!formData.password) errors.password = "Password tidak boleh kosong";
    if (!formData.pin) errors.pin = "PIN tidak boleh kosong";
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(formError).length > 0) {
      const timer = setTimeout(() => setFormError({}), 3000); // Clear error messages after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return; // Pastikan validasi sebelum mengubah state

    setLoading(true);
    setFormData((prevData) => ({ ...prevData, loading: true, error: "" }));

    try {
      const res = await axios.post(
        "https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/register",
        {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          pin: formData.pin,
          password: formData.password,
          province: formData.province,
          city: formData.city,
          gender: formData.gender === "PRIA" ? "l" : "p",
          dateofBirth: formData.dateofBirth,
          minatKategori: "-",
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.responseCode === "2002500") {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        setOtp(randomNumber.toString());
        sessionStorage.setItem("phone", formData.phone);

        const response = await axios.post(
          `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/Verify?userAccount=${formData.phone}`,
          { randomNumber }
        );

        if (response.data.responseCode === "2002500") {
          localStorage.setItem("member", response.data.loginData.memberID);
          router.push(`/otp-register`);
        } else {
          console.log("Error OTP:", response.data);
        }
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
      setFormData((prevData) => ({ ...prevData, loading: false }));
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="px-8">
        {isError && <ErrorMessage message={"User sudah terdaftar"} />}
      </div>
      <div className="flex flex-col m-8">
        <h1 className="text-lg font-medium">Daftar Member</h1>
        <p className="text-xs my-4">
          Daftar akun untuk mendapatkan info terbaru tentang promo, koleksi dan
          keuntungan member lainnya.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            label="*Nama Lengkap"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.fullName}
          />
          <Input
            label="*No Handphone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.phone}
          />
          <Input
            label="*Alamat Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.email}
          />
          <Select
            labelSelect="*Provinsi"
            labelOption="Pilih Provinsi"
            options={optionsProv}
            value={prov}
            onChange={(e) => handleSelectChange(e, "province")}
            className="mb-4"
            error={formError.province}
          />
          <Select
            labelSelect="*Kota"
            labelOption="Pilih Kota"
            options={optionsCity}
            value={city}
            onChange={(e) => handleSelectChange(e, "city")}
            className="mb-4"
            error={formError.city}
          />
          <Input
            label="*Tanggal Lahir"
            type="date"
            name="dateofBirth"
            value={formData.dateofBirth}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.dateofBirth}
          />
          <Select
            labelSelect="*Jenis Kelamin"
            labelOption="Pilih Jenis Kelamin"
            options={[
              { id: "PRIA", label: "Laki-laki" },
              { id: "WANITA", label: "Perempuan" },
            ]}
            value={gender}
            onChange={(e) => handleSelectChange(e, "gender")}
            className="mb-4"
            error={formError.gender}
          />
          <Input
            label="*Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.password}
          />
          <Input
            label="*PIN"
            type="text"
            name="pin"
            value={formData.pin}
            onChange={handleInputChange}
            className="mb-4"
            error={formError.pin}
          />

          <input type="checkbox" name="allow" className="mb-4" required />
          <label className="text-xs ms-2">
            Saya menyetujui{" "}
            <span className="font-medium">Syarat dan ketentuan</span> yang
            berlaku.
          </label>

          <Button
            label="DAFTAR"
            className="bg-base-accent text-white rounded-full w-full p-2"
            loading={loading}
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
