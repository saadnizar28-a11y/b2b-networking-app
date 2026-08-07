import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Executive Networking | BCC UAE Chapter",
  description: "Connect with verified executive professionals worldwide. Official login screen for BCC UAE Chapter.",
  keywords: ["Executive Networking", "BCC UAE", "B2B", "Verified Professionals", "Login"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BCC Executive",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0B0B0D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full`}>
      <body className="h-full bg-[#0B0B0D] text-white selection:bg-[#ED1B3B]/30 selection:text-white antialiased subtle-grain">
        {children}
      </body>
    </html>
  );
}
