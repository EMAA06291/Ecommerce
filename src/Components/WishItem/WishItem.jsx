import { useContext } from "react";
import { WishContext } from "../../Context/wishlist.context";

export default function WishItem({ productInfo }) {
  const { _id, title, category, imageCover } = productInfo; 
  const { removeProductFromWish } = useContext(WishContext);

  return (
    <div className="flex gap-2">
      <div className="card-item grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
        <img
          src={imageCover}
          alt={title}
          className="w-24 h-24 object-cover border-white rounded-full"
        />
        <h3 className="text-lg text-gray-700 font-semibold">{title}</h3>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
      </div>
      <button
        onClick={() => removeProductFromWish({ productId: _id })}
        className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
