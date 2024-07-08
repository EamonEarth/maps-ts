import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const routes = [
  {
    title: "Home",
    href: "/",
  },
  
  {
    title: "Stakeholder List",
    href: "/stakeholder-map",
  },
  {
    title: "Member List",
    href: "/member-list",
  },
];

const MainNav = () => {
  return (
    <div className="relative top-0 h-[125px] w-full border-b-4 border-black">
      <div className="flex items-center h-full justify-around">
        <Image src="/logo.png" alt="logo" width={250} height={100} />
        <div>
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <Button variant="ghost">{route.title}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
