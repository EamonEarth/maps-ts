"use client";
import { SetStateAction, useEffect } from "react";
import { cn } from "@/lib/utils";
import oceanVert from "/public/ocean-vert.jpg";
import { AirtableRecord } from "../app/page";

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

    const element = document.getElementById(record.id);
    if (element && window.innerWidth > 768) {
      if (index > 3) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  };

  useEffect(() => {
    let currRecord = expandedRecord;
    let element = document.getElementById(currRecord.id);
    if (element && window.innerWidth < 768) {
      element.scrollIntoView({
        behavior: "instant",
        block: "start",
        inline: "end",
      });
    }
  }, [expandedRecord]);

  return (
    <div
      id="table"
      className="relative outline-none border-l-black border-t-black flex flex-col gap-y-2 md:gap-y-6 h-[50%]  md:h-full overflow-y-auto md:pr-2 w-full md:w-[25%] min-w-[250px] md:border md:border-r-8 border-b-4 border-b-black/50 border-r-black/50 overflow-hidden z-40"
      style={{
        backgroundImage: `url(${oceanVert.src})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-lg font-bold uppercase text-center pt-2">
        Stakeholders
      </h1>

      <div className="sticky lg:hidden z-30 text-sm top-0  flex flex-wrap items-center justify-around w-full max-w-[100%] bg-amber-300 py-1 px-2 border-b border-black">
        <div className="flex gap-x-2 text-xs flex-wrap max-w-[100%]">
          {currFilters.map((filter)=>(<p key={filter} className="max-w-[50vw] truncate font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
        </div>
         <div 
          onClick={()=> setShowMobileFilters(true)}
          className="ml-auto mr-2 opacity-60 bg-primary px-1 text-white rounded border cursor-pointer">
              Filters
        </div>
      </div>

      {filteredRecords.map((record, index) => {
        const { Stakeholder, Region, Email1, Website } = record.fields;

        return (
          <div
            className={cn(
              "flex flex-col rounded-r p-4 border-t border-b border-r border-black h-40 px-5 backdrop-blur-md",
              expandedRecord.id === record.id && "bg-slate-100"
            )}
            id={record.id}
            key={record.id}
            onClick={() => handleClick(record, index)}
          >
            <h2 className="text-wrap font-bold pb-2 leading-4">{Stakeholder}</h2>
            <div className="flex flex-col gap-y-1 ">
              {Region && (
                <div className="flex justify-between items-center">
                  <div className="text-xs">Region: </div>
                  <div className="text-xs rounded bg-blue-300- px-1">
                    {Region}
                  </div>
                </div>
              )}
              {Email1 && (
                <div className="flex justify-between items-center gap-x-2">
                  <div className="text-xs">Email: </div>
                  <div className="text-xs text-ellipsis truncate">
                    {Email1}
                  </div>
                </div>
              )}
              {Website && (
                <div className="flex justify-between items-center overflow-hidden gap-x-6">
                  <div className="text-xs">Website: </div>
                  <div className="text-xs truncate">{Website}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StakeholderTable;
