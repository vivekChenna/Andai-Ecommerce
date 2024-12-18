import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/layout/navbar";
import GraphQlProvider from "@/lib/GraphqlProvider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PluginProvider } from "../context/pluginsContext";

export const metadata = {
  title: "Andai",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-[#FFF8E3] dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <PluginProvider>
          <GraphQlProvider>
            <Navbar isAuthenticated={await isAuthenticated()} user={user} />
            <main>{children}</main>
          </GraphQlProvider>
        </PluginProvider>
      </body>
    </html>
  );
}
