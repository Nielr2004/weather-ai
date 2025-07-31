import type { Metadata } from "next";
import { Fredoka } from "next/font/google"; 
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Weather Fun",
  description: "A fun and aesthetic weather experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ## THE FIX: Add suppressHydrationWarning to the <html> tag ##
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.className}>{children}</body>
    </html>
  );
}