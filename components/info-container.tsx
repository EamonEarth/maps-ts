import { AirtableRecord } from "@/app/(stakeholder-map)/page";
import React, { Dispatch, SetStateAction } from "react";

import FilterSelect from "./filter-select";
import { Check, Contact2, Info, Mail, Map, MapPin, Pin, TicketCheck } from "lucide-react";
import bgImageRotated from "../public/header-opac-rotated.png"

interface InfoContainerProps {
  record: AirtableRecord;
  areaFilter: string;
  setAreaFilter: Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  showMobileFilters: boolean;
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
  memberCheck: boolean;
  setMemberCheck: Dispatch<React.SetStateAction<boolean>>
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
  showMobileFilters,
  setShowMobileFilters,
}) => {
  return (
    <div 
  
    className="w-full h-[20%] bg-slate-900- hidden lg:flex flex-col md:flex-row gap-y-6 overflow-scroll border-black border border-b-4 text-slate-100-">
      <div className="border-r flex flex-col gap-y-1 relative  md:h-auto w-full px-4 overflow-x-hidden border-black pt-4">
       <div 
      style={{
      backgroundImage: `url(${bgImageRotated.src})`,
      backgroundSize: 'cover', // Adjust as needed
      backgroundPosition: 'center', // Adjust as needed
      }}
      className="w-full h-full blur-[1px] absolute top-0 left-0"/>
        <div className="flex flex-wrap justify-between">
          <h1 className="font-semibold text-lg">{record.fields.Stakeholders}</h1>
          {record.fields["CMCN membership? (y/n)"] && (
            <p className="flex items-center gap-x-1 text-xs tracking-tighter py-1">
            {/* <p className="flex items-center gap-x-1 absolute right-1 top-1 text-xs tracking-tighter"> */}
              CMCN Member
              {/* <TicketCheck /> */}
              <Check className="size-3" />
            </p>
          )}
        </div>
        {record.fields.Region && record.fields.City !== "Perth" && (
          <p className="flex items-center gap-x-1 rounded ">
            <span className="w-[30px]">

            <Map />
            </span>
            {record.fields.Region}
          </p>
        )}
        {record.fields.City && (
          <p className="flex items-center justify-between gap-x-1">
            <span className="flex">
              <span className="w-[30px]">

              <MapPin color="#b41412"/>
              </span>
              {record.fields.City}
            </span>
            <span className="flex text-sm rounded  border  border-black p-1 max-w-[60%] overflow-scroll backdrop-blur-lg">
              {record.fields["Stakeholder cluster"]}
            </span>
          </p>
        )}
        {record.fields["Key Contact"] && (
          <p className="flex items-center justify-between gap-x-1">
            <span className="flex">
              <span className="w-[30px]">

              <Contact2 />
              </span>
              {record.fields["Key Contact"]}
            </span>
            {record.fields["Email address"] && (
              <p className="flex items-center gap-x-1 text-sm">
                <Mail />
                {record.fields["Email address"]}
              </p>
            )}
          </p>
        )}
        
        {record.fields.Website && (
          <p className="flex items-center gap-x-1 text-sm w-[80%]">
            <Info className="shrink-0" />{" "}
            <a
              target="_blank"
              className="truncate"
              href={record.fields.Website}
            >
              {record.fields.Website}
            </a>
          </p>
        )}
        {/* <p>{record.fields.latLong.lat}</p> */}
        {/* <p>{record.fields.latLong.long}</p> */}
      </div>
      {/* {showMobileFilters && (
        <MobileFilterSelect
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          clusterFilter={clusterFilter}
          setClusterFilter={setClusterFilter}
        />
      )}
      <span className="hidden md:block"> */}
      <FilterSelect
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        clusterFilter={clusterFilter}
        setClusterFilter={setClusterFilter}
        memberCheck={memberCheck}
        setMemberCheck={setMemberCheck}
      />
      {/* </span> */}
    </div>
  );
};

export default InfoContainer;
