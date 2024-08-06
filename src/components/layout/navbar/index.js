// import Cart from 'components/cart';
// import OpenCart from 'components/cart/open-cart';
import LogoSquare from "@/components/logo-square";
// import { getMenu } from 'lib/shopify';
import Link from "next/link";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "./search";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
// const { SITE_NAME } = process.env;

export default async function Navbar() {
  //   const menu = await getMenu('next-js-frontend-header-menu');

  const menu = [
    {
      title: "All",
      path: "/search",
    },
    {
      title: "Inhouse",
      path: "/search/inhouse",
    },
    {
      title: "Vendor",
      path: "/search/vendor",
    },
    {
      title: "Talk to AI",
      path: "/completion",
    },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
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
              className="w-10 h-10"
            />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {"And Ai"}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
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
      <Link href={`https://share.hsforms.com/1xnAsoonbSDKLmfRgEq9XQwrplpw`} target="_blank" >
        <button
          className=" bg-indigo-500 py-1.5 px-2 hover:bg-indigo-600 transition-all ease-in-out duration-200 rounded-md text-white text-sm font-medium"
        >
          SUBSCRIBE
        </button>
      </Link>
    </nav>
  );
}
