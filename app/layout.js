import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { FaBeer } from "react-icons/fa";

<FaBeer></FaBeer>;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPToDo",
  description: "Your Personal AI Assistant",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
