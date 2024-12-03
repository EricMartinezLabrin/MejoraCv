import React from "react";
import Container from "@/components/Container";
import Navitem from "@/components/Navitem";
import BtnLink from "@/components/BtnLink";
import AuthButtonServer from "./auth-button";

const navItems = [
  {
    href: "/dashboard",
    text: "Inicio",
  },
  {
    href: "/",
    text: "Revisar Cv",
  },
  {
    href: "#about-us",
    text: "About us",
  },
  {
    href: "#features",
    text: "Features",
  },
];

const Navbar: React.FC = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50 py-6">
      <Container>
        <nav className="w-full flex justify-between gap-6 relative">
          {/* logo */}
          <div className="min-w-max inline-flex relative">
            <a href="/" className="relative flex items-center gap-3">
              <div className="relative w-7 h-7 overflow-hidden flex rounded-xl">
                <span className="absolute w-4 h-4 -top-1 -right-1 bg-green-500 rounded-md rotate-45"></span>
                <span className="absolute w-4 h-4 -bottom-1 -right-1 bg-[#FCDC58] rounded-md rotate-45"></span>
                <span className="absolute w-4 h-4 -bottom-1 -left-1 bg-primary rounded-md rotate-45"></span>
                <span className="absolute w-2 h-2 rounded-full bg-heading-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
              </div>
              <div className="inline-flex text-lg font-semibold text-heading-1">
                AgenceX
              </div>
            </a>
          </div>

          <div
            data-nav-overlay
            aria-hidden="true"
            className="fixed hidden inset-0 lg:!hidden bg-box-bg bg-opacity-50 backdrop-filter backdrop-blur-xl"
          ></div>
          <div
            data-navbar
            className="flex h-0 overflow-hidden lg:!h-auto lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0"
          >
            <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-heading-2 w-full lg:justify-center lg:items-center">
              {navItems.map((item, index) => {
                return <Navitem {...item} key={index} />;
              })}
            </ul>

            <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-bg lg:border-0 px-6 lg:px-0 ">
              <AuthButtonServer />
            </div>
          </div>

          <div className="min-w-max flex items-center gap-x-3">
            <button
              data-switch-theme
              className="outline-none flex relative text-heading-2 rounded-full p-2 lg:p-3 border border-box-border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 dark:flex hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 dark:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                ></path>
              </svg>

              <span className="sr-only">switch theme</span>
            </button>

            <button
              data-toggle-nav
              data-open-nav="false"
              className="lg:hidden lg:invisible outline-none w-7 h-auto flex flex-col relative"
            >
              <span
                id="line1"
                className="w-6 h-0.5 rounded-full bg-heading-2 transition-all duration-300 ease-linear"
              ></span>
              <span
                id="line2"
                className="w-6 origin-center mt-1 h-0.5 rounded-ful bg-heading-2 transition-all duration-300 ease-linear"
              ></span>
              <span
                id="line3"
                className="w-6 mt-1 h-0.5 rounded-ful bg-heading-2 transition-all duration-300 ease-linear"
              ></span>
              <span className="sr-only">togglenav</span>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
