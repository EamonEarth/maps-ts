"use client"

import Image from "next/image"
import banner from "../public/banner.jpg"
import whirlpoolImg from "../public/pool-comp.png"
import departmentLogo from "../public/department-logo.png"
import { useEffect, useState } from "react"
import { throttle } from "@/lib/utils"

const Banner = () => {
    const [imageSize, setImageSize] = useState({ width: 250, height: 150 })

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
        <div className="w-full h-auto relative">
            <div
            style={{
                backgroundImage: `url(${banner.src})`,
                backgroundSize: "cover"
            }}
            className="flex justify-around items-center py-4"
            >
                <Image src={whirlpoolImg} alt="Whirlpool logo" height={imageSize.height} width={imageSize.width}/>
                <Image src={departmentLogo} alt="Departmental logo" height={imageSize.height} width={imageSize.width}/>

            </div>

        </div>
    )
}

export default Banner