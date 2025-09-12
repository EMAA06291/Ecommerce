import React, { useContext, useEffect } from "react";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { NavLink, Link } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { UserContext } from "../../Context/User.context";
import { Cartcontext } from "../../Context/Cart.context";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-80 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
          isActive ? "before:!w-full font-semibold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
};

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
      <Link to="/" className="flex items-center">
        <img
          src={freshCartLogo}
          alt="FreshCart Logo "
          className="xsm:min-w-[100px]"
        />
      </Link>

      <div className="flex order-2 items-center gap-4">
        {token && (
          <div className="cart relative">
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
        {token && (
          <span onClick={logout} className="cursor-pointer">
            <i className="fa-solid fa-right-from-bracket"></i>
          </span>
        )}
        
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        {token ? (
          <ul className="flex flex-col md:flex-row gap-5">
            <li><CustomNavLink to="/">Home</CustomNavLink></li>
            <li><CustomNavLink to="/categories">Categories</CustomNavLink></li>
            <li><CustomNavLink to="/brands">Brands</CustomNavLink></li>
            <li><CustomNavLink to="/wishlist">WishList</CustomNavLink></li>
            <li><CustomNavLink to="/allorders">Orders</CustomNavLink></li>
          </ul>
        ) : (
          <ul className="flex flex-col md:flex-row gap-5">
            <li><CustomNavLink to="/signup">SignUp</CustomNavLink></li>
            <li><CustomNavLink to="/login">Login</CustomNavLink></li>
          </ul>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}