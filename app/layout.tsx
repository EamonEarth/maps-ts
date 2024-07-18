import type { Metadata } from "next";
import { Inter, Chivo} from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";

// const inter = Inter({ subsets: ["latin"] });
const chivo = Chivo({subsets:["latin"]})


export const metadata: Metadata = {
  title: "WACMN Prototype",
  description: "WACMN Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={chivo.className}>
        <MainNav />

        {children}
      </body>
    </html>
  );
}
