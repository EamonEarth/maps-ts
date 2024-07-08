import { AirtableRecord } from "@/app/stakeholder-map/page";
import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FilterSelect from "./filter-select";
import { Check, Contact2, Info, Mail, Pin, TicketCheck } from "lucide-react";
import Image from "next/image";
import MobileFilterSelect from "./mobile-filter-select";
import FilterOptions from "@/app/member-list/components/filter-options";

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
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  record,
  setAreaFilter,
  areaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  showMobileFilters,
  setShowMobileFilters,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-y-6 overflow-scroll pl-4- border-t border-b ">
      <div className="border flex flex-col gap-y-1 relative h-[120px] md:h-auto w-full px-4 overflow-x-hidden">
        <h1 className="font-semibold text-lg">{record.fields.Stakeholders}</h1>
        {record.fields.Region && record.fields.City !== "Perth" && (
          <p className="flex items-center gap-x-1 rounded  bg-slate-200">
            <Image src="/aus-map.svg" alt="map" width={15} height={15} />
            {record.fields.Region}
            {/* <p className="flex gap-x-2 w-full justify-around ">
              <span>{record.fields.latLong.lat}</span>

              <span>{record.fields.latLong.long}</span>
            </p> */}
          </p>
        )}
        {record.fields.City && (
          <p className="flex items-center justify-between gap-x-1">
            <span className="flex">
              <Image src="/pin.png" alt="pin" width={15} height={15} />{" "}
              {record.fields.City}
            </span>
            <span className="flex text-sm rounded bg-blue-200 px-1 max-w-[60%] truncate">
              {record.fields["Stakeholder cluster"]}
            </span>
          </p>
        )}
        {record.fields["Key Contact"] && (
          <p className="flex items-center justify-between gap-x-1">
            <span className="flex">
              <Contact2 />
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
        {record.fields["CMCN membership? (y/n)"] && (
          <p className="flex items-center gap-x-1 absolute right-1 top-1 text-xs tracking-tighter">
            CMCN Member
            {/* <TicketCheck /> */}
            <Check className="size-3" />
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
      />
      {/* </span> */}
    </div>
  );
};

export default InfoContainer;
