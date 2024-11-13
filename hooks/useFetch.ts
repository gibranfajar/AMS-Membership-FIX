import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
// import get from "lodash.get"; // Import lodash.get untuk mengambil path dinamis, atau buat fungsi getCustomPath

// Tipe hook untuk data, loading, dan error
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions extends AxiosRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

// Helper untuk mengakses path data dinamis jika tidak menggunakan lodash
const getCustomPath = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const useFetch = <T>(url: string, dataPath: string, options?: FetchOptions) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        // Fetch data dengan Axios
        const response = await axios.request<T>({
          url,
          method: options?.method || "GET",
          ...options,
        });

        // Ambil data sesuai path
        const data = getCustomPath(response.data, dataPath); // Gunakan lodash.get atau getCustomPath
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setState({
            data: null,
            loading: false,
            error: error.response?.data || "Error fetching data",
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: "An unexpected error occurred",
          });
        }
      }
    };

    fetchData();
  }, [url, dataPath, options]);

  return state;
};

export default useFetch;
