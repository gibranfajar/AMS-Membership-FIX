import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import axios from "axios";

interface Promo {
  id: number;
  imageTitle: string;
  imageSubTitle: string;
  imageUrl: string;
  promoTitle: string;
  promoDetail: string;
  promoEndDate: string;
}

interface PromoContextType {
  promoData: Promo[] | null;
  loading: boolean;
  error: string | null;
  fetchPromos: (member: string) => void;
}

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export const PromoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [promoData, setPromoData] = useState<Promo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false); // Menambahkan flag untuk memastikan data hanya diambil sekali

  const fetchPromos = async (member: string) => {
    if (fetched) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/promo/list?memberID=${member}`
      );
      setPromoData(response.data.promoData);
      setFetched(true); // Menandai bahwa data telah diambil sekali
    } catch (err) {
      setError("Error fetching promos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PromoContext.Provider value={{ promoData, loading, error, fetchPromos }}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromoContext = () => {
  const context = useContext(PromoContext);
  if (!context) {
    throw new Error("usePromoContext must be used within a PromoProvider");
  }
  return context;
};
