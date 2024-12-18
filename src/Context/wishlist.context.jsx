import { createContext, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const WishContext = createContext(null);

export default function WishProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishInfo, setWishInfo] = useState(null);

  async function addProductToWish({ productId }) {
    let toastId = toast.loading("Adding product...");
    try {
      if (!token) {
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      toast.success(data.message);
      getWishProducts();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishProducts() {
    if (!token) {
      return;
    }

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setWishInfo(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeProductFromWish({ productId }) {
    let toastId = toast.loading("Deleting item...");
    try {
      if (!token) {
        return;
      }

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Item has been deleted.");
        getWishProducts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishContext.Provider
      value={{
        addProductToWish,
        getWishProducts,
        wishInfo,
        removeProductFromWish,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
