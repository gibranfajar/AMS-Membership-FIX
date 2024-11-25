import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface PhoneContextType {
  phone: string;
  otp: string;
  setPhone: (phone: string) => void;
  setOtp: (otp: string) => void;
  clearSession: () => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("phone");
    const storedOtp = sessionStorage.getItem("otp");

    if (storedPhone) setPhone(storedPhone);
    if (storedOtp) setOtp(storedOtp);
  }, []);

  useEffect(() => {
    if (phone) sessionStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    if (otp) sessionStorage.setItem("otp", otp);
  }, [otp]);

  const clearSession = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("otp");
    }
  };

  return (
    <PhoneContext.Provider
      value={{ phone, otp, setPhone, setOtp, clearSession }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) throw new Error("usePhone must be used within a PhoneProvider");
  return context;
};
