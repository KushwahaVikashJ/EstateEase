import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EstateEase",
  description: "Listing properties for sale or rent",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Provider>
            <Toaster />
            {children}
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
