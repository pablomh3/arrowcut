import type { Metadata } from "next";
import { Mako } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/LinkSlice/Provider";

const mako = Mako({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arrow link shortener",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-arrow-bg"}>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
