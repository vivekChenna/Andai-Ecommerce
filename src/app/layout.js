import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/layout/navbar";
import GraphQlProvider from "@/lib/GraphqlProvider";
import { PluginProvider } from "../context/pluginsContext";
import { ThemeProvider } from "./providers/theme-provider";
import Provider from "./providers/sessionProvider";

export const metadata = {
  title: "Andai",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      {/* <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-[#FFF8E3] dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"> */}
      <body className=" dark:text-white">
        <Provider>
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
              {  <Navbar  />}
                {/* <ThemeToggle /> */}
                <main>{children}</main>
              </GraphQlProvider>
            </PluginProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
