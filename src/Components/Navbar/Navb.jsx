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
          `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
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
          `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
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
          `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
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
          `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
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
          `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
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
      className="bg-slate-100 shadow-md py-3 fixed top-0 w-full z-10"
    >
      <div className="container flex items-center gap-12">
        <Link to="/">
          <img src={freshCartLogo} alt="FreshCart Logo" />
        </Link>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {token && (
            <ul className="flex gap-5 toggle">
              <HomeNavItem />
              <CategoriesNavItem />
              <BrandsNavItem />
              <WishListNavItem />
              <OrdersNavItem />
            </ul>
          )}
        </Navbar.Collapse>

        {token && (
          <div className="cart ml-auto relative">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping cursor-pointer text-lg"></i>
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

        {!token && (
          <ul className="flex gap-5 items-center ml-auto">
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}

        {token && (
          <ul>
            <li onClick={logout}>
              <span className="cursor-pointer">
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
            </li>
          </ul>
        )}
      </div>
    </Navbar>
  );
}
