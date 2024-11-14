import axios from "axios";

// Tipe data untuk Register
type RegisterData = {
  fullName: string;
  phone: string;
  email: string;
  pin: string;
  password: string;
  province: string;
  city: string;
  gender: string;
  dateofBirth: string;
  minatKategori: string;
};

// Fungsi untuk login
export const authLogin = async (
  data: { user: string; password: string },
  url: string
): Promise<any> => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Menggunakan JSON untuk data login
      },
    });
    return response.data; // Mengembalikan data hasil login
  } catch (error) {
    console.error("Login Error:", error);
    throw error; // Lemparkan error untuk ditangani di tempat lain
  }
};

// Fungsi untuk register
export const authRegister = async (
  data: RegisterData,
  url: string
): Promise<any> => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Menggunakan JSON untuk data registrasi
      },
    });
    return response.data; // Mengembalikan data hasil registrasi
  } catch (error) {
    console.log("Register Error:", error);
    throw error; // Lemparkan error untuk ditangani di tempat lain
  }
};
