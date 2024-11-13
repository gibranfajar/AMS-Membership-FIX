import useFetch from "@/hooks/useFetch";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

interface CarouselItem {
  id: number;
  imageUrl: string;
}

const Carousel: React.FC = () => {
  const { data, loading, error } = useFetch<CarouselItem[]>(
    "https://golangapi-j5iu.onrender.com/api/member/mobile/promo/list?memberID=1124537252593",
    "promoData"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000, // Delay in milliseconds
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`https://web.amscorp.id:3060/imagestorage/promo/${item.imageUrl}`}
                alt={`Image ${item.id}`}
                className="w-full h-auto rounded-lg"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Carousel;
