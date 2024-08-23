import React from 'react'
import { Check, Contact2, FacebookIcon, Info, Mail, Map, MapPin } from "lucide-react";
import { AirtableRecord } from '@/app/page';
import Link from 'next/link';
import Image from 'next/image';

import facebookIcon from "/public/facebook-bw.svg";
import instaIcon from "/public/instagram-bw.svg";


interface InfoContainerProps {
    record: AirtableRecord;
  }


const InfoContainer:React.FC<InfoContainerProps> = ({record}) => {
    const {
        Stakeholder,
        CMCN,
        Region,
        City,
        StakeholderGroup,
        StakeholderSubcluster,
        Contact,
        Email1,
        Website,
        Facebook,
        Instagram,
      } = record.fields;
  return (
    <div
        className="flex flex-col gap-y-1 relative md:h-auto w-full min-w-[50%] p-4 overflow-x-hidden rounded-xl border border-slate-700 bg-slate-200"
        // style={{
        //   backgroundImage: `url(${bgImageRotated.src})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        <div className="w-full h-full blur-[1px] absolute top-0 left-0" />
        <div className="relative z-10">
          <div className="flex justify-between items-center border-b ">
            <h1 className="font-light lg:text-lg">{Stakeholder}</h1>
            {/* {CMCN && (
              <p className="flex items-center gap-x-1 text-sm tracking-tighter py-1">
                CMCN Member
                <Check className="size-4" />
              </p>
            )} */}
            {StakeholderGroup && (
                <p className="flex items-center gap-x-1 text-xs lg:text-sm rounded border border-slate-800 p-1  max-w-[60%] overflow-scroll">
                  {StakeholderGroup}
                </p>
              )}
          </div>
          <div className="flex pt-2 md:text-sm lg:text-base">
            <div className="flex flex-col gap-y-1 w-1/2">
              {Region && (
                <p className="flex items-center gap-x-1 rounded">
                  <Map className="w-[30px]" />
                  {Region}
                </p>
              )}
              {City && (
                <p className="flex items-center gap-x-1">
                  <MapPin className="w-[30px]" color="#b41412" />
                  {City}
                </p>
              )}
              {Contact && (
                <p className="flex items-center gap-x-1">
                  <Contact2 className="w-[30px]" />
                  {Contact}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 w-1/2">
              {/* {StakeholderGroup && (
                <p className="hidden lg:flex items-center gap-x-1 !text-[10px] xl:text-sm rounded border border-slate-200 p-1 max-w-[60%] overflow-scroll backdrop-blur-lg">
                  {StakeholderGroup}
                </p>
              )} */}
              {Website && (
                <p className="flex items-center gap-x-1 text-xs xl:text-sm">
                  <Info className="shrink-0" />
                  <a
                    target="_blank"
                    className="truncate"
                    href={Website}
                  >
                    {Website}
                  </a>
                </p>
              )}
              {Email1 && (
                <p className="flex items-center gap-x-1 text-xs xl:text-sm">
                  <Mail className="shrink-0"/>
                  {Email1}
                </p>
              )}
              {(Facebook || Instagram) && (
                <div id="socialsDiv" className="flex items-center gap-x-4 py-1 rounded w-fit ">
                  {Facebook && (
                    <Link href={Facebook} target="_blank" className="bg-slate-200 rounded">
                      <Image src={facebookIcon.src} alt="facebook icon" height={30} width={30} />
                    </Link>
                  )}
                  {Instagram && (
                    <Link href={Instagram} target="_blank" className="bg-slate-200 rounded">
                      <Image src={instaIcon.src} alt="instagram icon" height={30} width={30} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoContainer