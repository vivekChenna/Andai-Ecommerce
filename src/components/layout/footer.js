import Link from "next/link";
import FooterMenu from "@/components/layout/footer-menu";
import { Suspense } from "react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";

  const menu = [
    { path: "/", title: "Home" },
    { path: "https://www.andaiplatforms.com/about", title: "About" },
    { path: "https://www.andaiplatforms.com/info", title: "Contact Us" },
    {
      path: "https://www.andaiplatforms.com/terms",
      title: "Terms & Conditions",
    },
    { path: "https://www.andaiplatforms.com/privacy", title: "Privacy Policy" },
  ];

  return (
    <footer className="text-sm bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 border-b border-neutral-200 px-6 py-10 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        {/* Logo Section */}
        <div>
          <Link
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200"
            href="/"
          >
            <Image
              src="/newAndai.jpg"
              className="w-10 h-10 rounded"
              alt="AndAI Logo"
              width={0}
              height={0}
            />
            <span className="uppercase font-semibold text-lg">
              AndAI Platforms Pvt Ltd
            </span>
          </Link>
        </div>

        {/* Menu Section */}
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

        {/* Subscribe Section */}
        <div className="md:ml-auto">
          <Link
            href={`https://share.hsforms.com/1xnAsoonbSDKLmfRgEq9XQwrplpw`}
            target="_blank"
          >
            <button className="bg-gray-800 py-2 px-6 rounded-md text-white hover:bg-gray-700 transition-all duration-200 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 font-medium">
              Subscribe
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="py-6 text-center text-sm font-medium">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 md:flex-row md:justify-between min-[1320px]:px-0  border-neutral-200 dark:border-neutral-700">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {copyrightDate}{" "}
            <strong>AndAI Platforms Pvt Ltd, Inc.</strong> All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-300">Designed in India</p>
        </div>
      </div>
    </footer>
  );
}
