import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "logix.lol",
  description: "logix' personal website",
  icons: {
    icon: "/seal.png",
    shortcut: "/seal.png",
    apple: "/seal.png",
  },
  openGraph: {
    type: "website",
    url: "https://logix.lol",
    title: "logix.lol",
    description: "logix' personal website",
    images: [
      {
        url: "./seal.png",
        width: 1200,
        height: 630,
        alt: "logix' personal website",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnelDisplay.variable} antialiased overflow-hidden`}>
        <div className="flex flex-col items-center justify-center h-screen">
          {/* <Navbar /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
