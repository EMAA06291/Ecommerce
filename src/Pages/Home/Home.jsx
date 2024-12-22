import React from "react";
import Card from "../../Components/Card/Card";
import Looding from "../../Components/Looding/Looding";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Slider from "../../Components/Slider/Slider";
export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    return () => {
      getProducts();
    };
  }, []);

  return (
    <>
      <Slider></Slider>
      <CategorySlider />
      {!products ? (
        <Looding />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-6   ">
          {products.map((product) => (
            <Card productInfo={product} key={product.id}></Card>
          ))}
        </div>
      )}
    </>
  );
}
