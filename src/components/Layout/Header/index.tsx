import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import MenuIcon from "@icons/menu.svg";
import ChevronRight from "@icons/chevron-right.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "md:top-0 md:left-0 md:right-0"
            : "md:top-[21px] md:left-[20px] md:right-[20px]"
        }`}
      >
        <div className="bg-white backdrop-blur-sm px-6 py-4 md:px-10 md:py-8 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-5">
            <a
              href="#"
              className="text-sm font-normal hover:opacity-70 transition-opacity"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-normal hover:opacity-70 transition-opacity"
            >
              News
            </a>
            <a
              href="#"
              className="text-sm font-normal hover:opacity-70 transition-opacity"
            >
              Services
            </a>
            <a
              href="#"
              className="text-sm font-normal hover:opacity-70 transition-opacity"
            >
              Our Team
            </a>
            <a
              href="#"
              className="text-sm font-normal hover:opacity-70 transition-opacity"
            >
              Make Enquiry
            </a>
          </nav>

          <button className="md:ml-auto border border-black px-4 py-2 text-base hover:bg-black hover:text-white transition-colors flex items-center gap-4 cursor-pointer">
            Contact us
            <img src={ChevronRight} alt="Arrow" className="w-[18px] h-[14px]" />
          </button>

          <button
            className="md:hidden ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <img src={MenuIcon} alt="Menu" className="w-[48px] h-[48px]" />
            )}
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
