
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

import {QueryClientContextProvider} from "@/contexts/QueryClientContextProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoni.edu System",
  description: "Zoni High School Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryClientContextProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryClientContextProvider>
        </body>
    </html>
  );
}
