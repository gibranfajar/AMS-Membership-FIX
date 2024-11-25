import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import axios from "axios";

interface User {
  memberID: string;
  fullName: string;
  phone: string;
  email: string;
  province: string;
  provinceID: string;
  city: string;
  cityID: string;
  gender: string;
  dateofBirth: string;
}

interface UserDetailContextType {
  userData: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (userId: string) => void;
}

const UserDetailContext = createContext<UserDetailContextType | undefined>(
  undefined
);

export const UserDetailProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false); // Menambahkan flag untuk memastikan data hanya diambil sekali

  const fetchUser = async (userId: string) => {
    if (fetched) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/profile?memberID=${userId}`
      );
      setUserData(response.data.memberData);
      setFetched(true); // Tandai bahwa data telah diambil
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userData, loading, error, fetchUser }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetailContext = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetailContext must be used within a UserProvider");
  }
  return context;
};
