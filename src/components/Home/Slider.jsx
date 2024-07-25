import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Virtual } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";

const Slider = ({ data }) => {
  const stars = Array.from({ length: 6 }, (_, index) => index + 1);
  SwiperCore.use([Autoplay]);

  return (
    <div className="mt-4 sm:mt-16 p-4 sm:p-8 xl:px-[108px]">
      <div className="">
        <Swiper
          modules={[Virtual]}
          spaceBetween={20}
          virtual
          autoplay={{
            delay: 2000,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} virtualIndex={item.id}>
              <div
                className="rounded-[20px] border p-4 sm:p-8 max-w-[580px] mx-auto my-2 "
                key={item.id}
              >
                <div className="flex items-center ">
                  {stars.map((star) => (
                    <img
                      key={star}
                      src="/star.svg"
                      alt={`Star ${star}`}
                      className=" w-6 h-6"
                    />
                  ))}
                </div>
                <p className="font-normal sm:text-3xl my-[22px] sm:leading-[42.2px] text-black">
                  “{item.comment} ”{" "}
                </p>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 sm:w-[75px]  sm:h-[75px]">
                    <img
                      src={item.image}
                      className="w-full h-full"
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p className="font-bold sm:leading-[31.65px] sm:text-2xl text-black">
                      {item.name}
                    </p>
                    <p className="font-normal leading-[26.36px] sm:text-xl text-black">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
