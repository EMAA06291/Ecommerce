import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Looding from "../../Components/Looding/Looding";
import { Link } from "react-router-dom";
export default function UserOrders() {
  const { token } = useContext(UserContext);
  let { id } = jwtDecode(token);
  const [order, setOrder] = useState(null);
  async function getUserOrder() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setOrder(data);
    } catch (error) {}
  }
  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <>
      {order ? (
        <section className="space-y-2">
          {order.map((order) => (
            <div key={order.id}>
              <div className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">Order ID</h2>
                    <span className="text-lg font-font-semibold text-gray-500">
                      {order.id}
                    </span>
                  </div>
                  <div>
                    {order.isPaied ? (
                      <span className="font-cairo inline-block px-3 py-1 mx-2 bg-red-500 text-white font-semibold rounded-md">
                        مدفوع
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 mx-2 bg-red-500 text-white font-semibold rounded-md">
                        غير مدفوع
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-md">
                        تم التوصيل
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-md">
                        قيد التوصيل
                      </span>
                    )}
                  </div>
                </header>
              </div>

              <div className="grid my-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item border-2 border-gray-400 border-opacity-30 p-4 rounded-lg/"
                  >
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-full"
                    />
                    <h3 className="text-lg font-semibold line-clamp-1 text-gray-600 mb-3">
                      <Link to={`/product/>${product.product.id}`}>
                        {product.product.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center">
                      <p>
                        <span className="font-bold bg-primary-60 bg-opacity-60">
                          Count:
                        </span>{" "}
                        {product.count}
                      </p>
                      <span className="text-primary-100 font-bold">
                        {product.price} L.E
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="my-2 font-bold text-lg  bg-orange-500 p-2 bg-opacity-30 text-pink-950">your total order price is <span className="text-red-700">{order.totalOrderPrice}</span> LE</p>
            </div>
            
          ))}
        </section>
      ) : (
        <Looding />
      )}
    </>
  );
}
