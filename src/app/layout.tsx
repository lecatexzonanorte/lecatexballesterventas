import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lecatex - Revestimientos de Calidad Argentina",
  description: "Revestimientos plásticos, texturados y al agua de primera calidad. Envío a todo el país. Calidad que se ve.",
  keywords: ["Lecatex", "revestimientos", "plásticos", "texturados", "pinturas", "enduidos", "Argentina", "construcción"],
  authors: [{ name: "Lecatex" }],
  icons: {
    icon: "/lecatex-logo.png",
  },
  openGraph: {
    title: "Lecatex - Revestimientos de Calidad Argentina",
    description: "Revestimientos plásticos, texturados y al agua de primera calidad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
