import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Cartcontext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/User.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function ChickOut() {
  const { CartInfo } = useContext(Cartcontext);
  const { token } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();
  async function createCashOrder(values) {
    let toastId = toast.loading("we are creating your order");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${CartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("your order has been created");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function CreateOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.status == "success") {
        toast.loading("redirecting you to stripe");

        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {}
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod == "online") CreateOnlineOrder(values);
      else createCashOrder(values);
    },
  });

  return (
    <>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-4">
          Shipping Address
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="form-control w-full mb-3"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
            />
          </div>
          <div className="phone">
            <input
              type="tel"
              className="form-control w-full mb-3"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              name="shippingAddress.phone"
            />
          </div>
          <div className="details">
            <textarea
              className="form-control w-full mb-3"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            ></textarea>
          </div>

          <button
            onClick={() => {
              setPaymentMethod("cash");
            }}
            type="submit"
            className="mb-6 btn bg-primary-100 hover:bg-primary-300 transition-colors duration-300 w-full text-white"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPaymentMethod("online");
            }}
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 transition-colors duration-300 w-full text-white"
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
