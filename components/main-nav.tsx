"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import MobileSidebar from "./mobile-sidebar";
import headerBg from "../public/header-comp.png"
import headerBgOpac from "/public/header-opac3.png"


export const routes = [
  {
    title: "Home",
    href: "/",
  },
  
  {
    title: "Stakeholder Map",
    href: "/stakeholder-map",
  },
  {
    title: "Member List",
    href: "/member-list",
  },
];

const MainNav = () => {

  const [imageSize, setImageSize] = useState({ width: 250, height: 100 });
  const { isOpen, toggleSidebar } = useMobileSidebar();
  useEffect(() => {
    const updateImageSize = debounce(() => {
      if (window.innerWidth > 768) {
        setImageSize({ width: 250, height: 100 });
      } else {
        setImageSize({ width: 150, height: 50 });
      }
    }, 200); // Adjust the delay as needed

    updateImageSize(); // Set initial size
    window.addEventListener("resize", updateImageSize);

    return () => {
      window.removeEventListener("resize", updateImageSize);
    };
  }, []);

  return (
    <div 
    style={{
      backgroundImage: `url(${headerBgOpac.src})`,
      // backgroundImage: `url(${headerBg.src})`,
      backgroundSize: 'cover', // Adjust as needed
      backgroundPosition: 'center', // Adjust as needed
      
    }}
        className="relative top-0 h-[60px] md:h-[125px] w-full border-b-4 border-black">
      <div 
      style={{
        backgroundImage: `url(${headerBgOpac.src})`,
        // backgroundImage: `url(${headerBg.src})`,
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        
      }}    className="absolute top-0 h-[60px] md:h-[125px] w-full opacity-50 pointer-events-none -z-50"/>
      <div className="flex items-center h-full justify-around">
        <Image src="/logo.png" alt="logo" width={imageSize.width} height={imageSize.height} />
        <div className="hidden md:flex items-center text-xs md:text-base">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <Button className="text-xs md:text-base"variant="ghost">{route.title}</Button>
            </Link>
          ))}
        </div>
        <span className="block md:hidden">

          <Menu onClick={toggleSidebar}/>
        </span>
          <MobileSidebar />
        
      </div>
    </div>
  );
};

export default MainNav;
