import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBS app",
  description: "NextJS practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-slate-200">
      <body className={inter.className}>
        <div className="bg-slate-200">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
