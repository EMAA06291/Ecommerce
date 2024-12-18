import React from "react";
import imag3 from "../../assets/images/slider-image-1.jpeg";
import imag2 from "../../assets/images/slider-image-2.jpeg";
import imag1 from "../../assets/images/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function Slider() {
  return (
    <section className="grid grid-cols-12 mb-8 overflow-hidden  " >
      
      <div className="col-span-8">
        <Swiper slidesPerView={1} loop={true}>
          <SwiperSlide>
            <img className="h-full w-full object-cover " src={imag1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-full w-full object-cover " src={imag1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-4 ">
        <img className="w-full" src={imag2} alt="" />

        <img className="w-full" src={imag3} alt="" />
      </div>
    </section>
  );
}
