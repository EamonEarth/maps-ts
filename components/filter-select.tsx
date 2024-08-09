import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import bgImageRotated from "../public/header-opac-rotated-twice.png"
import { stakeholderTypes, regions } from "../lib/data";

 
interface FilterSelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  memberCheck: boolean;
  setMemberCheck: Dispatch<SetStateAction<boolean>>;
  socialsCheck: boolean;
  setSocialsCheck: Dispatch<React.SetStateAction<boolean>>;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  areaFilter,
  setAreaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  memberCheck,
  setMemberCheck,
  socialsCheck,
  setSocialsCheck
}) => {
  
  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setClusterFilter("")
    setMemberCheck(false)
    setSocialsCheck(false)
  }

  const currFilters: string[] = [];

  if (nameFilter) currFilters.push(`Name: ${nameFilter}`);
  if (areaFilter) currFilters.push(`Area: ${areaFilter}`);
  if (clusterFilter) currFilters.push(`Org. Type: ${clusterFilter}`);

  return (
    <div 
    style={{
      backgroundImage: `url(${bgImageRotated.src})`,
      backgroundSize: 'repeat', // Adjust as needed
      backgroundPosition: 'center', // Adjust as needed
  }}
    className=" flex flex-col px-4 py-2 w-full  gap-y-2 rounded relative">
     
      
      <div className="flex items-center justify-between">

      <h2 className="font-bold tracking-normal">Filter:</h2>
         <div className="flex gap-x-2 text-xs">
          {currFilters.map((filter)=>(<p key={filter} className="font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
         </div>
      </div>
      <div className="grid grid-cols-3 justify-around gap-x-2">
        <div className="col-span-1 flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              className="text-black bg-muted"
            />
            <X
              className="opacity-50 size-4"
              onClick={() => setNameFilter("")}
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <Select
              onValueChange={(value) => setAreaFilter(value)}
              value={areaFilter}
            >
              <SelectTrigger className="text-muted-foreground">
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
              className="opacity-50 size-4"
              onClick={() => setAreaFilter("")}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-y-2 ">
          <div className="flex gap-x-2 items-center  overflow-hidden">
            <Select
              onValueChange={(value) => setClusterFilter(value)}
              value={clusterFilter}
            >
              <SelectTrigger className="text-muted-foreground">
                <SelectValue className="" placeholder="Org. Type" />
              </SelectTrigger>
              <SelectContent>
                {stakeholderTypes.map((type)=>(
                  <SelectItem key={`type+${type}`} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
          </div>
          <div className="flex flex-col w-[80%]">

          <div className="flex items-center gap-x-2 text-xl  rounded p-2 justify-between">
            <p className="text-xs">CMCN Member?</p>

          <Checkbox color="white" checked={memberCheck} onCheckedChange={()=>setMemberCheck(!memberCheck)}/>
          </div>
          <div className="flex items-center  gap-x-2 text-xl  rounded p-2 justify-between">
            <p className="text-xs">Social Media?</p>

          <Checkbox color="white" checked={socialsCheck} onCheckedChange={()=>setSocialsCheck(!socialsCheck)}/>
          </div>
          </div>
        </div>
        <div className="flex flex-col col-span-1">
         


        <Button 
        className="text-xs text-wrap border-slate-200 border"
        disabled={!areaFilter && !nameFilter && !clusterFilter && !memberCheck && !socialsCheck}
        onClick={clearAllFilters}> Clear All Filters </Button>
        </div>
        
      </div>
    </div>
  );
};

export default FilterSelect;
