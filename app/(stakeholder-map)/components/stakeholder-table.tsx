"use client"
import { SetStateAction, useEffect } from "react";
import { AirtableRecord } from "../page"
import { cn } from "@/lib/utils";
import oceanVert from"../../../public/ocean-vert.jpg"
 

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

      useEffect(()=>{
        let currRecord = expandedRecord
        let element = document.getElementById(currRecord.id)
        if (element && (window.innerWidth < 768)) {
          console.log(element)
          element.scrollIntoView({
            behavior: "instant",
            block: "start",
            inline: "end"
          })
        }
      },[expandedRecord])
    
    return (
        <div
        id="table"
        className="relative -left-[1px] flex flex-col gap-y-2 md:gap-y-6 h-[50%]  md:h-full bg-slate-200- overflow-y-auto md:pr-2 w-full md:w-[25%] min-w-[250px] md:border md:border-r-8 border-b-4 border-b-black/50 border-r-black/50 overflow-hidden z-10"
        style={{
          backgroundImage: `url(${oceanVert.src})`,
          backgroundSize: 'cover'
        }}
      >
    
        <h1 className="text-lg font-bold uppercase text-center pt-2">
          Stakeholders
        </h1>
        
        {filteredRecords.map((record, index) => (
          <div
            className={cn(
              "flex flex-col rounded-r p-4 border-t border-b border-r border-black h-40 px-5 backdrop-blur-md",
              expandedRecord.id === record.id && "bg-slate-100"
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