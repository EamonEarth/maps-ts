import Image from "next/image"
import banner from "../public/banner.jpg"
import whirlpoolImg from "../public/pool-comp.png"
import departmentLogo from "../public/department-logo.png"

const Banner = () => {
    return (
        <div className="w-full h-auto relative">
            <div
            style={{
                backgroundImage: `url(${banner.src})`,
                backgroundSize: "cover"
            }}
            className="flex flex-col md:flex-row justify-around items-center py-4"
            >
                <Image src={whirlpoolImg} alt="Whirlpool logo" height={150} width={250}/>
                <Image src={departmentLogo} alt="Departmental logo" height={150} width={250}/>

            </div>

        </div>
    )
}

export default Banner