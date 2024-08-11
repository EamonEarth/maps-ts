import { AirtableRecord } from '@/app/page';
import React, { Dispatch, SetStateAction } from "react";
import { Check, Contact2, Info, Mail, Map, MapPin } from "lucide-react";
import bgImageRotated from "../public/header-opac-rotated.png";
import Link from 'next/link';
import Image from 'next/image';
import facebookIcon from "/public/facebook.svg";
import instaIcon from "/public/instagram.svg";
import FilterSelect from './filter-select';

interface InfoContainerProps {
  record: AirtableRecord;
  areaFilter: string;
  setAreaFilter: Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  memberCheck: boolean;
  setMemberCheck: Dispatch<React.SetStateAction<boolean>>;
  socialsCheck: boolean;
  setSocialsCheck: Dispatch<React.SetStateAction<boolean>>;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  record,
  setAreaFilter,
  areaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  memberCheck,
  setMemberCheck,
  socialsCheck,
  setSocialsCheck
}) => {
  const {
    Stakeholder,
    CMCN,
    Region,
    City,
    StakeholderGroup,
    Contact,
    Email1,
    Website,
    Facebook,
    Instagram,
  } = record.fields;

  return (
    <div className="w-full h-[25%] bg-slate-900 hidden md:flex flex-col md:flex-row gap-y-6 overflow-scroll border-black border border-b-4 text-slate-100">
      <div
        className="border-r flex flex-col gap-y-1 relative md:h-auto w-full px-4 overflow-x-hidden border-black pt-4"
        style={{
          backgroundImage: `url(${bgImageRotated.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full h-full blur-[1px] absolute top-0 left-0" />
        <div className="relative z-10">
          <div className="flex justify-between items-center border-b ">
            <h1 className="font-semibold lg:text-lg">{Stakeholder}</h1>
            {CMCN && (
              <p className="flex items-center gap-x-1 text-sm tracking-tighter py-1">
                CMCN Member
                <Check className="size-4" />
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
              {StakeholderGroup && (
                <p className="hidden lg:flex items-center gap-x-1 !text-[10px] xl:text-sm rounded border border-slate-200 p-1 max-w-[60%] overflow-scroll backdrop-blur-lg">
                  {StakeholderGroup}
                </p>
              )}
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
                  <Mail />
                  {Email1}
                </p>
              )}
              {(Facebook || Instagram) && (
                <div id="socialsDiv" className="flex items-center gap-x-4 py-1 rounded w-fit ">
                  {Instagram && (
                    <Link href={Instagram} target="_blank" className="bg-slate-200 p-1 rounded">
                      <Image src={instaIcon.src} alt="instagram icon" height={30} width={30} />
                    </Link>
                  )}
                  {Facebook && (
                    <Link href={Facebook} target="_blank" className="bg-slate-200 p-1 rounded">
                      <Image src={facebookIcon.src} alt="facebook icon" height={30} width={30} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FilterSelect
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        clusterFilter={clusterFilter}
        setClusterFilter={setClusterFilter}
        memberCheck={memberCheck}
        setMemberCheck={setMemberCheck}
        socialsCheck={socialsCheck}
        setSocialsCheck={setSocialsCheck}
      />
    </div>
  );
};

export default InfoContainer;
