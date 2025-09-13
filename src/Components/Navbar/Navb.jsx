import React, { useContext, useEffect } from "react";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { UserContext } from "../../Context/User.context";
import { Cartcontext } from "../../Context/Cart.context";

function HomeNavItem() {
  return (
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
            isActive ? "before:!w-full font-semibold" : ""
          }`
        }
      >
        Home
      </NavLink>
    </li>
  );
}

function CategoriesNavItem() {
  return (
    <li>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
            isActive ? "before:!w-full font-semibold" : ""
          }`
        }
      >
        Categories
      </NavLink>
    </li>
  );
}

function BrandsNavItem() {
  return (
    <li>
      <NavLink
        to="/brands"
        className={({ isActive }) =>
          `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
            isActive ? "before:!w-full font-semibold" : ""
          }`
        }
      >
        Brands
      </NavLink>
    </li>
  );
}

function WishListNavItem() {
  return (
    <li>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
            isActive ? "before:!w-full font-semibold" : ""
          }`
        }
      >
        WishList
      </NavLink>
    </li>
  );
}

function OrdersNavItem() {
  return (
    <li>
      <NavLink
        to="/allorders"
        className={({ isActive }) =>
          `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
            isActive ? "before:!w-full font-semibold" : ""
          }`
        }
      >
        Orders
      </NavLink>
    </li>
  );
}

export default function Navb() {
  const { token, logout } = useContext(UserContext);
  const { CartInfo, GetCartProducts } = useContext(Cartcontext);

  useEffect(() => {
    GetCartProducts();
  }, []);

  return (
    <Navbar
      fluid
      rounded
      className="bg-white shadow-sm border-b border-gray-200 py-3 fixed top-0 w-full z-50"
    >
<div className="w-full flex items-center justify-between px-4">
        <Link to="/" className="flex-shrink-0 z-30">
          <img
            src={freshCartLogo}
            alt="FreshCart Logo "
            className="xsm:min-w-[100px] block"
          />
        </Link>

        <div className="flex items-center gap-4 md:order-2 z-30">
          {token && (
            <div className="cart relative">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping cursor-pointer text-gray-600 hover:text-primary-80 text-lg"></i>
              </Link>
              <div className="cart-counter h-4 w-4 rounded-full flex justify-center items-center bg-primary-80 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                {CartInfo === null ? (
                  <i className="fa-solid fa-spinner animate-spin text-white"></i>
                ) : (
                  <span className="text-white text-xs font-bold text-center">
                    {CartInfo.numOfCartItems}
                  </span>
                )}
              </div>
            </div>
          )}
          {token && (
            <span
              onClick={logout}
              className="cursor-pointer text-gray-600 hover:text-primary-80"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
          )}
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse className="absolute left-0 top-full mt-2 w-full bg-white shadow-md p-4 md:static md:mt-0 md:w-auto md:bg-transparent md:shadow-none md:p-0 md:flex md:flex-row md:items-center justify-between z-20">
          {token ? (
            <ul className="flex flex-col md:flex-row gap-5">
              <HomeNavItem />
              <CategoriesNavItem />
              <BrandsNavItem />
              <WishListNavItem />
              <OrdersNavItem />
            </ul>
          ) : (
            <ul className="flex flex-col md:flex-row gap-5 items-center ml-auto">
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    ` relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                >
                  SignUp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `relative text-gray-800 before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
