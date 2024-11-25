import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Brand {
  id: number;
  brand: string;
}

export default function Brand() {
  // state
  const [brands, setBrands] = useState<Brand[]>([]);

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "https://golangapi-j5iu.onrender.com/api/v2.0/member/mobile/brand"
      );

      if (response.data.responseCode) {
        setBrands(response.data.brandData);
      }
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };

  // Fetch brands when component mounts
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brand) => (
        <div
          className="p-8 bg-gray-200 rounded-md flex justify-center"
          key={brand.id}
        >
          <Image
            src="/images/brands/celcius.svg"
            width={150}
            height={150}
            alt={brand.brand}
            className="w-auto h-auto"
          />
        </div>
      ))}
    </div>
  );
}
