import React, { useState, useEffect } from "react";
import axios from "axios";
import Looding from "../../Components/Looding/Looding";

export default function Brands() {
  const [Brands, setBrands] = useState(null);

  async function getBrands() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Our Brands
      </h2>
      {!Brands ? (
        <Looding />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Brands.map((item) => {
            const { image, _id, name } = item;
            return (
              <div
                key={_id}
                className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
              
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                <h5 className="text-lg font-semibold text-center py-4 text-gray-700">
                  {name}
                </h5>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
