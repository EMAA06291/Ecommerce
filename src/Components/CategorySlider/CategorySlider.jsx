import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Looding from "../Looding/Looding";

export default function CategorySlider() {
  const [Categories, setCategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data.data);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      {!Categories ? (
        <Looding />
      ) : (
        <Swiper slidesPerView={6} loop={true} className="mb-9"> 
          {Categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="md:w-full md:h-72 flex justify-center items-center xsm:h-20 xsm:w-full ">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center mt-2 font-bold uppercase bg-primary-60 bg-opacity-50 xsm:text-xs xsm:line-clamp-1 md:line-clamp-2 md:text-lg">{category.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
