// Navbar.js
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdMenu, MdClose } from "react-icons/md";

const BurgerMenuIcon = () => <MdMenu className="text-white" size={24} />;
const CloseIcon = () => <MdClose className="text-white" size={24} />;

export const Navbar = ({ toggleSidebar }) => {
  // State to track the scroll position
  const [scrollPos, setScrollPos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Update the scroll position state when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  return (
    <>
      {/* Add a fixed position and top value to the nav element */}
      {/* Change the background color based on the scroll position */}
      <nav
        className={`navbar-main shadow py-4 px-6 flex items-center justify-between ${
          scrollPos > 0 ? "bg-gray-200" : "bg-white"
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      >
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="logo-img"
            width="100%"
            height={50}
          />
        </div>
        <button
          className="z-10 p-4 text-white rounded-br-lg md:hidden show-at-1150px"
          onClick={handleToggleSidebar}
        >
          {isOpen ? <CloseIcon /> : <BurgerMenuIcon />}
        </button>
      </nav>
    </>
  );
};
