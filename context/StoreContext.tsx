import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import axios from "axios";

interface Store {
  brand: string;
  storeID: string;
  kota: string;
  storeAddress: string;
  noTelpon: string;
  mapStoreUrl: string;
}

interface StoreContextType {
  storeData: Store[] | null;
  loading: boolean;
  error: string | null;
  fetchStore: (member: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [storeData, setStoreData] = useState<Store[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false); // Menambahkan flag untuk memastikan data hanya diambil sekali

  const fetchStore = async (member: string) => {
    if (fetched) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/member/mobile/location/list?memberID=${member}`
      );
      setStoreData(response.data.storeLocationData);
      setFetched(true); // Menandai bahwa data telah diambil sekali
    } catch (err) {
      setError("Error fetching promos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContext.Provider value={{ storeData, loading, error, fetchStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
