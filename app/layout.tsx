import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider"
import "../styles/style.css";

import Sidebar from "@/components/main/sidebar";
import CookieBanner from "@/components/main/cookiesBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NekoRPG",
  description: "UwU",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <div className="main">
            <div className="sidebar">
              <Sidebar/>
            </div>
            <main className="content">
              {children}
            </main>
          </div>
          <CookieBanner />
        </Provider>
      </body>
    </html>
  );
}
