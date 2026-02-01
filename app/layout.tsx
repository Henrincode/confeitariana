import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const fontPoppins = Poppins({
  weight: ['100','200','300','400','500','600','700','800','900']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Confeitariana",
  description: "Gerenciador de produtos e clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fontPoppins.className} ${geistSans.variable} ${geistMono.variable} antialiased h-dvh bg-amber-100`}
      >
        <NavBar className="mb-3" />
        {children}
      </body>
    </html>
  );
}
