"use client";

// import Cart from 'components/cart';
// import OpenCart from 'components/cart/open-cart';
import LogoSquare from "@/components/logo-square";
// import { getMenu } from 'lib/shopify';
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import Search, { SearchSkeleton } from "./search";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ProfileAvatar } from "@/components/profile-avatar";
// const { SITE_NAME } = process.env;

export default function Navbar({ isAuthenticated, user }) {
  //   const menu = await getMenu('next-js-frontend-header-menu');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const menu = [
    {
      title: "Latest",
      path: "/latest",
    },
    {
      title: "All Plugins",
      path: "/search",
    },

    // {
    //   title: "Inhouse",
    //   path: "/search/inhouse",
    // },
    // {
    //   title: "Vendor",
    //   path: "/search/vendor",
    // },
    {
      title: "Talk to AI",
      path: "/completion",
    },
  ];

  console.log("user", user);



  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} isAuthenticated={isAuthenticated} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            {/* <LogoSquare /> */}
            <img
              src="https://andai.co.in/images/logo.png"
              className="w-12 h-12  rounded-md"
            />
            <div className="ml-2 flex-none text-sm font-medium  md:hidden lg:block text-black">
              {"Andai"}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="relative text-black font-medium underline-offset-4 hover:underline px-2 py-1 rounded transition-all duration-300 ease-in-out"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        {/* <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div> */}
      </div>
      <div className=" flex flex-row items-center">
        <Link
          href={`https://share.hsforms.com/1xnAsoonbSDKLmfRgEq9XQwrplpw`}
          target="_blank"
        >
          <button className=" bg-indigo-500 py-1.5 px-2 hover:bg-indigo-600 transition-all ease-in-out duration-200 rounded-md text-white text-sm font-medium mr-3">
            SUBSCRIBE
          </button>
        </Link>
        {isAuthenticated ? (
          <div
            className="relative  lg:block hidden "
         ref={dropdownRef}
         onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <button variant="ghost" size="icon" className="rounded-full">
              <ProfileAvatar name={user?.given_name} imageUrl={user?.picture} />
            </button>
            {isDropdownOpen && (
    <div className="absolute right-0 mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50 border">
      <LogoutLink className="md:block hidden min-w-max rounded-md text-black text-center px-4 py-1">
        Log out
      </LogoutLink>
    </div>
  )}
          </div>
        ) : (
          <div className=" md:flex items-center hidden">
            <div className=" min-w-max mr-3 bg-gray-200 rounded-md px-2 py-1">
              <LoginLink>Sign in</LoginLink>
            </div>
            <div className=" min-w-max mr-3 bg-gray-200 rounded-md px-2 py-1">
              <RegisterLink>Sign up</RegisterLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
