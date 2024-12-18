import { useContext, useEffect } from "react";
import { Cartcontext } from "../../Context/Cart.context";
import CartItem from "../../Components/CartItem/CartItem";
import Looding from "../../Components/Looding/Looding";
import { Link } from "react-router-dom";

export default function Cart() {
  const { GetCartProducts, CartInfo, clearCart } = useContext(Cartcontext);

  useEffect(() => {
    GetCartProducts();
  }, []);

  return (
    <>
      {CartInfo == null ? (
        <Looding />
      ) : (
        <section>
          <div className="flex gap-5 items-center mb-3">
            <i className="fa-brands fa-opencart text-2xl"></i>
            <h2 className="font-semibold text-xl text-slate-600">
              | your shopping cart
            </h2>
          </div>
          {CartInfo.numOfCartItems === 0 ? (
            <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
              <h2 className="text-center text-lg text-gray-700">
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                to="/"
                className="btn bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {CartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="mt-5 flex justify-between items-center">
                <p className="text-xl">
                  <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
                  Your Total Cart Price{" "}
                  <span className="text-primary-600 font-bold">
                    {CartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  onClick={() => {
                    clearCart();
                  }}
                  className="btn bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  Clear Cart
                </button>
              </div>
            </>
          )}
          <div>
            <Link
              to="/chickout"
              className="  btn bg-primary-50 hover:bg-primary-300 transition-colors duration-300 rounded-md text-white py-2"
            >
              CHICK OUT
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
