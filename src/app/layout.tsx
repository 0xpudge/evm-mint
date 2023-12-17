import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Goerli | Alpha Hunter",
  description: "Goerli | Alpha Hunter",
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
