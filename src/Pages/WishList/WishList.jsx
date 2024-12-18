import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import WishItem from "../../Components/WishItem/WishItem";
import Looding from "../../Components/Looding/Looding";
import { WishContext } from "../../Context/wishlist.context";

export default function Wishlist() {
  const { wishInfo, getWishProducts } = useContext(WishContext);

  useEffect(() => {
    getWishProducts();
  }, []);

  if (!wishInfo) {
    return <Looding />;
  }

  return (
    <section>
      <div className="flex gap-5 items-center mb-3">
        <i className="fa-brands fa-opencart text-2xl"></i>
        <h2 className="font-semibold text-xl text-slate-600">
          | Your Wishlist 💞💞💞💞💞
        </h2>
      </div>

      {wishInfo.length === 0 ? (
        <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
          <h2 className="text-center text-lg text-gray-700">
            Oops! Your wishlist is empty. Start shopping now by clicking the
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
        <div className="space-y-4 mt-6">
          {wishInfo.map((product) => (
            <WishItem key={product._id} productInfo={product} />
          ))}
        </div>
      )}
    </section>
  );
}
