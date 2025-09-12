import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getcartcount,
    wishlistProducts,
    isSeller,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Utility: NavLink styles
  const navLinkClass = ({ isActive }) =>
    `hover:text-[var(--color-primary)] transition ${
      isActive ? "text-[var(--color-primary)] font-medium" : "text-gray-700"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" width={157} height={40} />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6 md:gap-8">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          All Product
        </NavLink>
       
        <NavLink to="/seller" className={navLinkClass}>
          Seller
        </NavLink>

        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>

        {/* Search Input */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Wishlist (desktop) */}
        {user && (
          <div
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.wishlist_icon}
              alt="wishlist"
              className="w-6 opacity-80"
            />
            {wishlistProducts.length > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {wishlistProducts.length}
              </span>
            )}
          </div>
        )}

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getcartcount()}
          </span>
        </div>

        {/* Login / Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="profile"
              aria-haspopup="true"
              aria-expanded={showDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40">
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/my-orders");
                  }}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/wishlist");
                  }}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  Wishlist
                </li>
                {(user || isSeller) && (
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/chat");
                    }}
                    className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                  >
                    Chat
                  </li>
                )}
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                  }}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 sm:hidden">
        {user && (
          <div
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.wishlist_icon}
              alt="wishlist"
              className="w-6 opacity-80"
            />
            {wishlistProducts.length > 0 && (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {wishlistProducts.length}
              </span>
            )}
          </div>
        )}

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getcartcount()}
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          <NavLink to="/seller" onClick={() => setOpen(false)}>
            Seller
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
          Contact
          </NavLink>
          
          {user && (
            <>
              <NavLink to="/my-orders" onClick={() => setOpen(false)}>
                My Orders
              </NavLink>
              <NavLink to="/wishlist" onClick={() => setOpen(false)}>
                Wishlist
              </NavLink>
              {(user || isSeller) && (
                <NavLink
                  to="/chat"
                  onClick={() => setOpen(false)}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  Chat
                </NavLink>
              )}
            </>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;




