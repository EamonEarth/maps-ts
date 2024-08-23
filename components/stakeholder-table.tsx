"use client";
import { SetStateAction, useEffect } from "react";
import { cn } from "@/lib/utils";
import oceanVert from "/public/ocean-vert.jpg";
import { AirtableRecord } from "../app/page";
import AlphNav from "./alph-nav";

interface StakeholderTableProps {
  filteredRecords: AirtableRecord[];
  expandedRecord: AirtableRecord;
  setExpandedRecord: React.Dispatch<SetStateAction<AirtableRecord>>;
  setOpenMarker: React.Dispatch<SetStateAction<string | null>>;
  setShowMobileFilters: React.Dispatch<SetStateAction<boolean>>;
  currFilters: string[]
}

const StakeholderTable: React.FC<StakeholderTableProps> = ({
  filteredRecords,
  expandedRecord,
  setExpandedRecord,
  setOpenMarker,
  setShowMobileFilters,
  currFilters
}) => {
  const handleClick = (record: AirtableRecord, index: number) => {
    setExpandedRecord(record);
    setOpenMarker(record.id);

    // const element = document.getElementById(record.id);
    // if (element && window.innerWidth > 768) {
    //   window.scrollBy(0,1)
    //   if (index > 3) {
    //     element.scrollIntoView({
    //       behavior: "smooth",
    //       block: "center",
    //       inline: "nearest",
    //     });
    //   } else {
    //     element.scrollIntoView({
    //       behavior: "smooth",
    //       block: "start",
    //       inline: "nearest",
    //     });
    //   }
    // }
  };



  return (
    <div
      id="table"
      className="relative outline-none flex flex-col  gap-y-2 md:gap-y-6 h-[50%] max-h-screen md:h-full overflow-y-auto overflow-x-hidden p-2 w-full md:w-[30%] min-w-[250px] rounded-xl bg-slate-200 border border-slate-700 z-40"
    >

      <div className="sticky md:hidden z-30 text-sm top-0 flex flex-wrap items-center justify-around w-full max-w-[100%] bg-amber-300 py-1 px-2 border-b border-slate-900">
        <div className="flex gap-x-2 text-xs flex-wrap max-w-[100%]">
          {currFilters.map((filter) => (
            <p
              key={filter}
              className="max-w-[50vw] truncate font-extralight opacity-80 border border-black rounded p-1"
            >
              {filter}
            </p>
          ))}
        </div>
        <div
          onClick={() => setShowMobileFilters(true)}
          className="ml-auto mr-2 opacity-60 bg-primary px-1 text-white rounded border cursor-pointer"
        >
          Filters
        </div>
      </div>
      <h1 className="text-lg font-bold uppercase text-center pt-2">
      
        Stakeholders
      </h1>
  
      {filteredRecords.map((record, index) => {
        const { Stakeholder, Region, Email1, Website } = record.fields;
  
        return (
          <div
            className={cn(
              "flex flex-col items-start justify-center w-full rounded p-2 md:p-4 border border-black backdrop-blur-md",
              expandedRecord.id === record.id && "bg-cyan-100"
            )}
            id={record.id}
            key={record.id}
            onClick={() => handleClick(record, index)}
          >
            <h2 className="font-bold pb-1 md:pb-2 leading-4 text-sm md:text-base text-center w-full break-words">
              {Stakeholder}
            </h2>
            <div className="flex flex-col gap-y-2 w-full">
              {Region && (
                <div className="flex justify-between items-center">
                  <div className="text-xs">Region:</div>
                  <div className="text-xs rounded bg-blue-300 px-1 break-words">
                    {Region}
                  </div>
                </div>
              )}
              {Email1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-y-1 md:gap-y-0 gap-x-2">
                  <div className="text-xs">Email:</div>
                  <div className="text-xs break-words">{Email1}</div>
                </div>
              )}
              {Website && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-y-1 md:gap-y-0 gap-x-2">
                  <div className="text-xs">Website:</div>
                  <div className="text-xs text-end break-words truncate w-full">
                    {Website}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}  

export default StakeholderTable;
