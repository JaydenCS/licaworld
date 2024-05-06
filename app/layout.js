import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "/components/Sessionprovider"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lica World",
  description: "LinkedIn Content Automation",
};

export default function RootLayout({ children }) {
  const session = getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
