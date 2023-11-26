import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NI | Alpha Hunter",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/hunter.jpg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
