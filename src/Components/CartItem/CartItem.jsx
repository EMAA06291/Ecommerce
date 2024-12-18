import { Cartcontext } from "../../Context/Cart.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { id, title, category, imageCover } = product;
  let { removeProductFromCart, updateProductCount } = useContext(Cartcontext);
  return (
    <>
      <div className="flex gap-2">
        {" "}
        <div className="card-item grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
          <img
            src={imageCover}
            alt={title}
            className="w-24 h-24 object-cover border-white rounded-full "
          />
          <h3 className="text-lg text-gray-700 font-semibold">
            {" "}
            <Link to={`/proudct/${id}`}>{title}</Link>
          </h3>
          <h4 className="text-gray-500 font-semibold">{category.name}</h4>
          <div className="count flex gap-5 items-center">
            <span className="text-lg font-bold text-gray-600">{count}</span>
            <div className="icons space-y-2">
              <div
                onClick={() => {
                  updateProductCount({
                    productId: id,
                    count: count - 1,
                  });
                }}
                className="w-6 h-6 rounded-full  bg-gray-700 text-white cursor-pointer flex justify-center items-center"
              >
                <i className="fa-solid fa-minus"></i>
              </div>
              <div
                onClick={() => {
                  updateProductCount({
                    productId: id,
                    count: count + 1,
                  });
                }}
                className="w-6 h-6 rounded-full bg-gray-700 text-white cursor-pointer flex justify-center items-center"
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>

            <span>{price}</span>
          </div>
        </div>
        <button
          onClick={() => removeProductFromCart({ productId: id })}
          className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
