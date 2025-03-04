"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Palette, Monitor } from "lucide-react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import { signOut, useSession } from "next-auth/react";
import { ProfileAvatar } from "@/components/profile-avatar";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session, status } = useSession();

  // Ensure the component is client-rendered
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      const handleOutsideClick = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [isDropdownOpen]);

  const menu = [
    { title: "Latest Plugins", path: "/latest" },
    { title: "All Plugins", path: "/search" },
    { title: "Talk to AI", path: "/completion" },
  ];

  // Prevent rendering theme-dependent UI until mounted
  if (!mounted) return null;

  const hideNavbarRoutes = ["/auth/login"];
  const shouldShowNavbar = hideNavbarRoutes.includes(pathname);

  return shouldShowNavbar ? null : (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* Mobile Menu */}
      <div className="block flex-none md:hidden ">
        <Suspense fallback={null}>
          <MobileMenu
            menu={menu}
            isAuthenticated={status === "authenticated"}
          />
        </Suspense>
      </div>

      {/* Logo and Navigation */}
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-5/12">
          <Link
            href="/"
            className="mr-2 flex w-full items-center md:w-auto lg:mr-6"
          >
            <Image
              src="/newAndai.jpg"
              alt="Andai Logo"
              width={48}
              height={48}
              className=" items-center sm:ml-0 ml-20 rounded"
            />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="relative font-medium text-[16px] px-3 py-1 rounded-md transition-all duration-300 ease-in-out text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white group"
                  >
                    {item.title}
                    {/* Underline Effect */}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {pathname !== "/" && (
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
        )}
      </div>

      {/* Actions: Theme Switcher and Authentication */}
      <div className="flex flex-row items-center  sm:space-x-10">
        {/* Theme Switcher */}
        <div className="flex items-center space-x-2 rounded-full bg-gray-800 p-2">
          {/* System Mode */}
          <button
            onClick={() => setTheme("andai")}
            className={`flex items-center justify-center w-4 h-4 rounded-full ${
              theme === "andai" ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            aria-label="System Theme"
          >
            <Image
              src={"/newAndai.jpg"}
              width={0}
              height={0}
              className="w-6 h-6 object-cover rounded-full"
              alt="andai"
            />
          </button>

          {/* Light Mode */}
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center w-4 h-4 rounded-full ${
              theme === "light" ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            aria-label="Light Theme"
          >
            <Sun className="h-5 w-5" />
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center w-4 h-4 rounded-full ${
              theme === "dark" ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            aria-label="Dark Theme"
          >
            <Moon className="h-5 w-5" />
          </button>
        </div>

        {/* Profile/Authentication */}
        {
          status === "authenticated" && (
            <div className="relative lg:block hidden" ref={dropdownRef}>
              <button
                className="rounded-full"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <ProfileAvatar
                  name={session?.user?.name}
                  imageUrl={session?.user?.image}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50 border">
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="block w-full text-center px-4 py-1 text-black min-w-max"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )
          // ) : (
          //   <div className="hidden md:flex items-center">
          //     <div className="min-w-max mr-3 bg-gray-200 rounded-md px-2 py-1">
          //       <LoginLink>Sign in</LoginLink>
          //     </div>
          //     <div className="min-w-max mr-3 bg-gray-200 rounded-md px-2 py-1">
          //       <RegisterLink>Sign up</RegisterLink>
          //     </div>
          //   </div>
          // )}
        }
      </div>
    </nav>
  );
}
