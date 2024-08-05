"use client"
import { SetStateAction, useEffect } from "react";
import { AirtableRecord } from "../page"
import { cn } from "@/lib/utils";

interface StakeholderTableProps {
    filteredRecords: AirtableRecord[];
    expandedRecord: AirtableRecord;
    setExpandedRecord: React.Dispatch<SetStateAction<AirtableRecord>>;
    setOpenMarker: React.Dispatch<SetStateAction<string | null>>;
}

const StakeholderTable: React.FC<StakeholderTableProps> = ({
    filteredRecords,
    expandedRecord,
    setExpandedRecord,
    setOpenMarker
}) => {

    const handleClick = (record: AirtableRecord, index: number) => {
        setExpandedRecord(record);
        setOpenMarker(record.id);
        
          const element = document.getElementById(record.id);
          if (element && (window.innerWidth > 768)) {
            if (index > 1) {
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

      useEffect(()=>{
        let currRecord = expandedRecord
        let element = document.getElementById(currRecord.id)
        if (element && (window.innerWidth < 768)) {
          element.scrollIntoView({
            behavior: "instant",
            block: "center",
            inline: "nearest"
          })
        }
      },[expandedRecord])
    
    return (
        <div
        id="table"
        className="flex flex-col gap-y-2 md:gap-y-6 h-[33%] md:h-full bg-amber-500 overflow-y-auto md:p-2 w-full md:w-[25%] min-w-[250px] md:border md:border-r-8 border-b-4 border-b-black/50 border-r-black/50 relative "
      >
        <h1 className="text-lg font-bold uppercase text-center ">
          Stakeholders
        </h1>
        {filteredRecords.map((record, index) => (
          <div
            className={cn(
              "flex flex-col rounded p-4 border border-black h-40 px-5",
              expandedRecord.id === record.id && "bg-blue-100"
            )}
            id={record.id}
            key={record.id}
            onClick={() => handleClick(record, index)}
          >
            <h2 className=" text-wrap font-bold pb-2 leading-4">
              {record.fields.Stakeholders}
            </h2>
            <div className="flex flex-col gap-y-1 ">
              {record.fields.Region && (
                <span className="flex justify-between items-center">
                  <div className="text-xs ">Region: </div>
                  <div className="text-xs rounded bg-blue-300- px-1">
                    {" "}
                    {record.fields.Region}{" "}
                  </div>
                </span>
              )}
              {record.fields["Email address"] && (
                <span className="flex justify-between items-center gap-x-2">
                  <div className="text-xs">Email: </div>
                  <div className="text-xs text-ellipsis truncate">
                    {" "}
                    {record.fields["Email address"]}
                  </div>
                </span>
              )} 
              {record.fields.Website && (
                <span className="flex justify-between items-center overflow-hidden gap-x-6">
                  <div className="text-xs">Website: </div>
                  <div className="text-xs truncate">
                    {" "}
                    {record.fields.Website}
                  </div>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
}

export default StakeholderTable