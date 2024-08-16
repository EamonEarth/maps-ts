import type { Metadata } from "next";
import { Inter, Chivo} from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react"

// const inter = Inter({ subsets: ["latin"] });
const chivo = Chivo({subsets:["latin"]})


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
      <body className={chivo.className}>
        <MainNav />
        <Banner />
        {children}
        <Footer />
        <Analytics />
        
      </body>
    </html>
  );
}
