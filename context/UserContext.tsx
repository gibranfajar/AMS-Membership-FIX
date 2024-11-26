import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import axios from "axios";

interface TierInfo {
  tier: string;
  tierImage: string;
  amountStartingFrom: number;
  amountUpTo: number;
  profileImage: string;
  cardImage: string;
  memberPersentase: number;
}

interface User {
  memberID: string;
  fullName: string;
  phone: string;
  pin: string;
  points: number;
  joinDate: string;
  tierInfo: TierInfo;
}

interface UserContextType {
  userData: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/dashboard/info?memberID=${userId}`
      );
      setUserData(response.data.memberInfoData);
      setFetched(true); // Tandai bahwa data telah diambil
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userData, loading, error, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
