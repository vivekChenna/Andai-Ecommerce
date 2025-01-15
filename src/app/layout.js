import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/layout/navbar";
import GraphQlProvider from "@/lib/GraphqlProvider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PluginProvider } from "../context/pluginsContext";
import { ThemeProvider } from "./providers/theme-provider";

export const metadata = {
  title: "Andai",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      {/* <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-[#FFF8E3] dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"> */}
      <body className=" dark:text-white">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{
            light: "light",
            dark: "dark",
            andai: "andai",
          }}
        >
        <PluginProvider>
          <GraphQlProvider>
            <Navbar isAuthenticated={await isAuthenticated()} user={user} />
            {/* <ThemeToggle /> */}
            <main>{children}</main>
          </GraphQlProvider>
        </PluginProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
