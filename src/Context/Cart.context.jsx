import { createContext, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const Cartcontext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [CartInfo, setCartInfo] = useState(null);

  async function addProductToCart({ productId }) {
    let toastId = toast.loading("Adding product...");
    try {
      if (!token) {
        return;  
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        GetCartProducts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function GetCartProducts() {
    if (!token) {
      return;  
    }

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.error(error);
     
    }
  }

  async function removeProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting item...");
    try {
      if (!token) {
        return; 
      }

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Item has been deleted.");
        GetCartProducts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function clearCart() {
    let toastId = toast.loading("Clearing your cart...");
    try {
      if (!token) {
        return; 
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("Cart has been cleared.");
        setCartInfo({
          numOfCartItems: 0,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function updateProductCount({ productId, count }) {
    try {
      if (!token) {
        return; 
      }

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Cartcontext.Provider
      value={{
        addProductToCart,
        GetCartProducts,
        CartInfo,
        removeProductFromCart,
        clearCart,
        updateProductCount
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
