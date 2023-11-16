// import NavBar from "@/ui/navbar/navbar";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Providers } from "./providers";
// const inter = Inter({ subsets: ["latin"] });


import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Viewport } from "next";
import { Suspense } from "react";
import { inter, sfPro } from "./fonts";
import "./globals.css";

export const metadata = {
    title: "SQLBot",
    description:
      "SQLBot is a conversational database interface that allows users to query databases using natural language.",
    metadataBase: new URL("https://sqlbot.co.kr"),
  };
  
export const viewport: Viewport = {
  themeColor: "#FFF",
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en" className="light">
//             <body className={inter.className}>
//                 <Providers>
//                     <NavBar />
//                     {children}
//                 </Providers>
//             </body>
//         </html>
//     );
// }


export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className={cx(sfPro.variable, inter.variable)}>
          <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          <Footer />
          <Analytics />
        </body>
      </html>
    );
  }