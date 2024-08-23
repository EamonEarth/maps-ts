import type { Metadata } from "next";
import { Inter, Chivo, Manrope} from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react"

// const inter = Inter({ subsets: ["latin"] });
const chivo = Chivo({subsets:["latin"]})

const manrope = Manrope({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "WACMN Stewards",
  description: "WACMN community portal",
  icons: {
    icon: "/iconattempt.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <MainNav />
        {children}
        <Banner />
        <Footer />
        <Analytics />
        
      </body>
    </html>
  );
}
