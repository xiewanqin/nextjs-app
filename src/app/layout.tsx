import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Noxa Store",
  description: "A simple store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" >
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
