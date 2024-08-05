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

interface MobileFilterSelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  memberCheck: boolean;
  setMemberCheck: Dispatch<SetStateAction<boolean>>;
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
  currentFilters: string[];
}

const MobileFilterSelect: React.FC<MobileFilterSelectProps> = ({
  areaFilter,
  setAreaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  memberCheck,
  setMemberCheck,
  setShowMobileFilters,
  currentFilters
  
}) => {

  

  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setClusterFilter("")
    setMemberCheck(false)
  }

  return (
    <div className="h-full w-full flex flex-col px-4 py-2 gap-y-2 rounded overflow-hidden">
      <div className="flex justify-around items-center">

      <h2 className="font-bold tracking-tight">Filters:</h2>
      <div 
        
        onClick={()=> setShowMobileFilters(false)}
        className="absolute- lg:hidden z-50 text-sm top-0 right-0 flex items-center justify-center opacity-60 bg-red-500 p-1 text-white rounded border cursor-pointer">
          Close Filters
      </div>
      </div>

      <div className="flex gap-x-2 text-xs flex-wrap">
          {currentFilters.map((filter)=>(<p key={filter} className="max-w-[90%] truncate font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
      </div>
      
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              className="opacity-80"
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
              <SelectTrigger className="">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perth">Perth</SelectItem>
                <SelectItem value="Peel">Peel</SelectItem>
                <SelectItem value="system">Blah blah</SelectItem>
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setAreaFilter("")}
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <Select
              onValueChange={(value) => setClusterFilter(value)}
              value={clusterFilter}
            >
              <SelectTrigger className="">
                <SelectValue className="" placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="Govern">Local Government</SelectItem>
                <SelectItem value="Consult">Consultants</SelectItem>
                <SelectItem value="First People">First Peoples</SelectItem>
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
        </div>
        <div className="flex items-center justify-around gap-x-2 text-xl  rounded p-2- ">
          <span className="flex gap-x-2">

            <p className="text-xs">CMCN Member?</p>

          <Checkbox checked={memberCheck} onCheckedChange={()=>setMemberCheck(!memberCheck)}/>
          </span>
          <Button 
          className="py-2" 
        disabled={!areaFilter && !nameFilter && !clusterFilter && !memberCheck}
        onClick={clearAllFilters}> Clear Filters </Button>
          </div>
          
        </div>
    </div>
  );
};

export default MobileFilterSelect;
