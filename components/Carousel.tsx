"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { usePromoContext } from "@/context/PromoContext";

const Carousel: React.FC = () => {
  const member = localStorage.getItem("member");
  const { promoData, loading, error, fetchPromos } = usePromoContext();

  useEffect(() => {
    fetchPromos(member as string);
  }, [fetchPromos, member]);

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
        {promoData &&
          promoData.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={`https://web.amscorp.id:3060/imagestorage/promo/${item.imageUrl}`}
                alt={`Image ${item.id}`}
                className="w-full h-auto rounded-lg"
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Carousel;
