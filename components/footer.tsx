import Image from "next/image"
import insta from "/public/Instagram-wacmn.webp"
import facebook from "/public/wacmcn-facebook.webp"
import linkedIn from "/public/wacmcn-linkedin.webp"
import Link from "next/link"
import bgImage from "/public/header-opac3.png"

const Footer = () => {
    return (
        <div 
        style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
        }}
        className="relative bottom-0 w-full flex flex-col md:flex-row items-center justify-around pb-4 md:py-4 border-t-black border-t">
                <div className="flex flex-col justify-center items-center md:items-start gap-y-2 pt-2">
                    <div className="flex items-center">
                        <Link href="https://www.instagram.com/wa_cmn/" target="_blank">
                        <Image src={insta} alt="Insta" width={40} height={40}/>
                        </Link>
                        <Link href="https://www.facebook.com/WA-CMCN-106045648244262" target="_blank">
                        <Image src={facebook} alt="Facebook" width={40} height={40}/>
                        </Link>
                        <Link href="https://www.linkedin.com/company/86584781/admin/" target="_blank">
                        <Image src={linkedIn} alt="LinkedIn" width={40} height={40}/>
                        </Link>

                    </div>
                    <div className="flex flex-col items-center md:items-start justify-center text-xs px-2">
                        <p className="font-semibold">
                        © 2024 WACMN
                        </p>
                        <p className="font-light">
                        Western Australian Coastal
                        </p>
                        <p className="font-light">
                        and Marine Network
                        </p>
                    </div>

                </div>
            <div className="flex flex-col justify-center items-center text-xs md:text-sm text-center p-2">
                <p>
                WACMN acknowledges the traditional owners and custodians of the lands and coastlines of Western Australia.
                </p>
                <p>
                We pay our respects to the Elders past, present and emerging as we share knowledge and care for the land and waters of this state.
                </p>
            </div>



        </div>
    )
}

export default Footer