import Link from "next/link";

import FooterMenu from "@/components/layout/footer-menu";
import LogoSquare from "@/components/logo-square";
// import { getMenu } from 'lib/shopify';
import { Suspense } from "react";

// const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  //   const menu = await getMenu('next-js-frontend-footer-menu');
  //   const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const menu = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/terms-conditions",
      title: "Terms & Conditions",
    },
    {
      path: "/shipping-return-policy",
      title: "Shipping & Return Policy",
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy",
    },
    {
      path: "/frequently-asked-questions",
      title: "FAQ",
    },
  ];

  return (
    <footer className="text-sm text-white bg-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6  border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link
            className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
            href="/"
          >
            <img
              src="https://andai.co.in/images/logo.png"
              className="w-10 h-10"
            />
            <span className="uppercase font-medium">{"AndAI"}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
        <Link href={`https://share.hsforms.com/1xnAsoonbSDKLmfRgEq9XQwrplpw`} target="_blank" >
        <button
          className=" bg-black py-1.5 px-4 hover:bg-indigo-600 transition-all ease-in-out duration-200 rounded-md text-white text-sm font-medium"
        >
          SUBSCRIBE
        </button>
      </Link>
        </div>
      </div>
      <div className="border-t border-neutral-300 py-6 text-sm text-white font-medium">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {"AND AI, Inc."}{" "}
            <span className=" px-1">All rights reserved.</span>
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in India</p>
          {/* <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Crafted by ▲ Vercel
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
