import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import axios from "axios";

interface BenefitData {
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
  point_5: string;
  point_6: string;
  point_7: string;
  point_8: string;
}

interface Tier {
  id: number;
  tier: string;
  amountStartingFrom: number;
  amountUpTo: number;
  tier_image: string;
  benefitData: BenefitData;
  cardImage: string;
}

interface TierContextType {
  tierData: Tier[] | null;
  loading: boolean;
  error: string | null;
  fetchTier: (member: string) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tierData, setTierData] = useState<Tier[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false); // Menambahkan flag untuk memastikan data hanya diambil sekali

  const fetchTier = async (member: string) => {
    if (fetched) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/tier/list?memberID=${member}`
      );
      setTierData(response.data.tierData);
      setFetched(true); // Menandai bahwa data telah diambil sekali
    } catch (err) {
      setError("Error fetching promos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TierContext.Provider value={{ tierData, loading, error, fetchTier }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTierContext = () => {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error("useTierContext must be used within a PromoProvider");
  }
  return context;
};
