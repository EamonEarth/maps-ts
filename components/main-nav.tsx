"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { throttle } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import MobileSidebar from "./mobile-sidebar";
import navBackground from "/public/navBackground.jpg"


export const routes = [
  {
    title: "Stakeholder Map",
    href: "/",
  },
  
  {
    title: "Member List",
    href: "/member-list",
  },
  {
    title: "WACMN Home",
    href: "https://wacmn.net/",
  },
];

const MainNav = () => {

  const [imageSize, setImageSize] = useState({ width: 250, height: 100 });
  const { isOpen, toggleSidebar } = useMobileSidebar();
  useEffect(() => {

    const updateImageSize = () => {
      if (window.innerWidth > 768) {
        setImageSize({ width: 250, height: 100 });
      } else {
        setImageSize({ width: 150, height: 50 });
      }
    }

    const throttledUpdateImageSize = throttle(updateImageSize, 100); 
  
    window.addEventListener("resize", throttledUpdateImageSize);
    updateImageSize()

    return () => {
      window.removeEventListener("resize", throttledUpdateImageSize);
    };
  }, []);

  return (
    <div 
      style={{
      backgroundImage: `url(${navBackground.src})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      }}
      className="relative top-0 h-[60px] md:h-[125px] w-full border-b border-black py-2">
    
      <div className="flex items-center h-full justify-around">
        <Image src="/logo.png" alt="logo" width={imageSize.width} height={imageSize.height} />
        <div className="hidden md:flex items-center text-xs md:text-base">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <Button 
              
               className="text-xs md:text-base text-slate-200" variant="ghost">{route.title}</Button>
            </Link>
          ))}
        </div>
        <span className="block md:hidden">

          <Menu className="text-slate-200"onClick={toggleSidebar}/>
        </span>
          <MobileSidebar />
        
      </div>
    </div>
  );
};

export default MainNav;
