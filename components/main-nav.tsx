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
    title: "Back to WACMN",
    href: "https://wacmn.net/resource-hub",
  },
];

const MainNav = () => {

  const [imageSize, setImageSize] = useState({ width: 200, height: 80 });
  const { isOpen, toggleSidebar } = useMobileSidebar();
  useEffect(() => {

    const updateImageSize = () => {
      if (window.innerWidth > 768) {
        setImageSize({ width: 200, height: 80 });
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
        <Link href="/">
        <Image src="/logo.png" alt="logo" width={imageSize.width} height={imageSize.height} />
        </Link>
        <div className="hidden md:flex items-center text-xs md:text-base gap-x-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <Button 
              size="sm"
              // style={{WebkitTextStroke: "1px black"}}
              
               className="text-xs md:text-base text-slate-100 px-2 py-1 hover:bg-slate-200- hover:bg-gradient-to-tr from-transparent to-slate-200 to-20% rounded-none rounded-tl-3xl rounded-br-2xl" variant="ghost"><span className="rounded-full backdrop-blur-[1px]">{route.title}</span></Button>
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
