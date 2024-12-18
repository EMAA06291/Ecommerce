import { createBrowserRouter, RouterProvider } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Layout from "./Components/Layout/Layout";
import Protected from "./Components/Protected/Protected";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import UserProvider from "./Context/User.context";
import CartProvider from "./Context/Cart.context";
import WishProvider from "./Context/wishlist.context";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/WishList/WishList";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/Categories";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ChickOut from "./Pages/ChickOut/ChickOut";
import UserOrders from "./Pages/UserOrders/UserOrders";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Layout />
        </Protected>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/proudct/:id",
          element: <ProductDetails />,
        },

        {
          path: "/chickout",
          element: <ChickOut />,
        },
        {
          path: "/allorders",
          element: <UserOrders />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <WishProvider>
            <RouterProvider router={router} />
          </WishProvider>
        </CartProvider>{" "}
      </UserProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
