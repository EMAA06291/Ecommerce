import { useContext, useState } from "react";
import { Cartcontext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/User.context";
import { WishContext } from "../../Context/wishlist.context";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  let { addProductToCart } = useContext(Cartcontext);
  let { addProductToWish } = useContext(WishContext);

  const {
    imageCover,
    title,
    price,
    category,
    description,
    ratingsAverage,
    id,
  } = productInfo;
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToWish = (productId) => {
    addProductToWish({ productId });
    setIsSuccess(true);
  };

  return (
    <>
      <div className="card group/card boxShadow p-5 rounded-lg overflow-hidden ">
        <div className="relative">
          <img src={imageCover} alt="" />
          <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 space-x-3 absolute left-0 top-0 bg-opacity-40 bg-slate-400 justify-center items-center flex w-full h-full opacity-0">
            <div
              onClick={() => handleAddToWish(id)}
              className={`w-8 h-8 text-center flex items-center justify-center rounded-full cursor-pointer ${
                isSuccess ? "text-red-500" : "text-white"
              } bg-[#b67175]`}
            >
              <i className="fa-solid icon fa-heart"></i>
            </div>

            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="w-8 h-8 text-white bg-[#b67175] text-center flex items-center justify-center rounded-full cursor-pointer "
            >
              <i className="fa-solid icon fa-cart-shopping"></i>
            </div>
            <div className="w-8 h-8 text-white bg-[#b67175] text-center flex items-center justify-center rounded-full cursor-pointer ">
              <Link to={`/proudct/${id}`}>
                 <i className="fa-solid icon fa-eye"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body space-y-3">
          <header>
            <h3 className="text-lg text-gray-500 font-semibold line-clamp-1">
            <Link to={`/proudct/${id}`}> {title}</Link>
            </h3>
            <h4 className="text-primary-400 font-semibold">{category.name}</h4>
          </header>
          <p className="text-gray-500 text-sm line-clamp-2">{description}</p>

          <div className="flex justify-between">
            <div>
              <span className="border bg-primary-40 bg-opacity-70 font-semibold">
                {price} <span>LE</span>
              </span>
            </div>
            <div>
              <i className="fa-solid fa-star mr-1 text-yellow-300"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
