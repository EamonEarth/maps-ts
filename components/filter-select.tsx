"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import bgImageRotated from "../public/header-opac-rotated-twice.png"
import { stakeholderTypes, regions, subclusterTypes } from "../lib/data";
import { debounce } from "@/lib/utils";

 
interface FilterSelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  subclusterFilter: string;
  setSubclusterFilter: Dispatch<SetStateAction<string>>;
  relevantSubs: string[];
  memberCheck: boolean;
  setMemberCheck: Dispatch<SetStateAction<boolean>>;
  socialsCheck: boolean;
  setSocialsCheck: Dispatch<React.SetStateAction<boolean>>;
  currFilters: string[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  areaFilter,
  setAreaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  subclusterFilter,
  setSubclusterFilter,
  relevantSubs,
  memberCheck,
  setMemberCheck,
  socialsCheck,
  setSocialsCheck,
  currFilters
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Temporary state for immediate input display

  
  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setInputValue("")
    setClusterFilter("")
    setSubclusterFilter("")
    setMemberCheck(false)
    setSocialsCheck(false)
  }


  const debouncedSetNameFilter = debounce((value: string) => {
    setNameFilter(value);
  }, 300);

  // Handle input change
  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value); // Update the input value immediately
    debouncedSetNameFilter(value); // Debounced update for nameFilter
  };
  return (
    <div 
  //   style={{
  //     backgroundImage: `url(${bgImageRotated.src})`,
  //     backgroundSize: 'repeat', // Adjust as needed
  //     backgroundPosition: 'center', // Adjust as needed
  // }}
    className="hidden  md:flex flex-col px-4 pt-5 w-[75%]  gap-y-2 rounded relative border-l border-white">
     
      
      <div className="flex lg:flex-row flex-col items-center justify-between gap-x-1">

      <h2 className="font-light tracking-normal"><Search size="20" className="opacity-80 pb-1"/></h2>
         <div className="flex gap-x-2 text-[11px]">
          {currFilters.map((filter)=>(<p key={filter} className="font-extralight opacity-80 border border-slate-200 rounded p-1">{filter}</p>))}
         </div>
      </div>
      <div className="grid grid-cols-8 justify-around gap-x-2">
        <div className="col-span-3 flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={handleNameInputChange}
              value={inputValue}
              className="text-black bg-muted text-xs"
            />
            <X
              className="cursor-pointer opacity-50 size-4"
              onClick={() => setNameFilter("")}
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <Select
              onValueChange={(value) => setAreaFilter(value)}
              value={areaFilter}
            >
              <SelectTrigger className="text-muted-foreground text-xs">
                <SelectValue
                  className=""
                  placeholder="Region"
                />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={`${region}+land`}value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="cursor-pointer opacity-50 size-4"
              onClick={() => setAreaFilter("")}
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-y-2 ">
          <div className="flex gap-x-2 items-center  overflow-hidden">
            <Select
              onValueChange={(value) => setClusterFilter(value)}
              value={clusterFilter}
            >
              <SelectTrigger className="text-muted-foreground text-xs">
                <SelectValue className="" placeholder="Stakeholder Group" />
              </SelectTrigger>
              <SelectContent>
                {stakeholderTypes.map((type)=>(
                  <SelectItem key={`type+${type}`} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="cursor-pointer opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
          </div>
          {/* ONLY DISPLAY SUBCLUSTERS THAT EXIST UNDER CLUSTER VALUE  */}
          <div className="flex gap-x-2 items-center  overflow-hidden">
            <Select
              onValueChange={(value) => setSubclusterFilter(value)}
              value={subclusterFilter}
              disabled={clusterFilter === ""}
            >
              <SelectTrigger className="text-muted-foreground text-xs">
                <SelectValue className="" placeholder="Stakeholder Subcluster" />
              </SelectTrigger>
              <SelectContent>
                {relevantSubs.map((type)=>(
                  <SelectItem key={`sub+${type}`} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="cursor-pointer opacity-50 size-4"
              onClick={() => setSubclusterFilter("")}
            />
          </div>

            {/* <div className="flex items-center w-[80%] h-8 gap-x-2 rounded justify-between">
              <p className="text-xs">CMCN Member?</p>
              <Checkbox color="white" checked={memberCheck} onCheckedChange={()=>setMemberCheck(!memberCheck)}/>
            </div> */}

            
          
        </div>
        <div className="flex flex-col col-span-2 gap-y-2">
         

            <div className="flex items-center w-[80%] h-8 gap-x-2  rounded p-2 justify-between">
              <p className="text-xs">Social Media?</p>
              <Checkbox color="white" checked={socialsCheck} onCheckedChange={()=>setSocialsCheck(!socialsCheck)}/>
            </div>

        <Button 
        className="text-xs text-wrap border-slate-200 border h-8"
        disabled={!areaFilter && !nameFilter && !clusterFilter && !subclusterFilter && !memberCheck && !socialsCheck}
        onClick={clearAllFilters}> Reset </Button>
        </div>
        
      </div>
    </div>
  );
};

export default FilterSelect;
