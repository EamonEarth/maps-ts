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
import { cities, coastalRegions, landRegions, districts, regions } from "../lib/data";
import { Button } from "./ui/button";
 
interface FilterSelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
  memberCheck: boolean;
  setMemberCheck: Dispatch<SetStateAction<boolean>>;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  areaFilter,
  setAreaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
  memberCheck,
  setMemberCheck
}) => {

  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setClusterFilter("")
    setMemberCheck(false)
  }
  return (
    <div className="md:border flex flex-col px-4 py-2 md:w-full  gap-y-2 rounded bg-slate-200">
      <div className="flex items-center justify-between">

      <h2 className="font-bold tracking-tight">Filter:</h2>
      <p className="text-xs flex font-bold">Current filters: <span className="flex justify-around font-normal">{areaFilter} {clusterFilter && <span> + {clusterFilter}</span>}</span></p>
      </div>
      <div className="grid grid-cols-3 justify-around gap-x-2">
        <div className="col-span-1 flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
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
                <SelectValue
                  className="placeholder-opacity-50"
                  placeholder="Area"
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
              <SelectTrigger className="">
                <SelectValue className="" placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="Local Government">Local Govt.</SelectItem>
                <SelectItem value="Consultant">Consultants</SelectItem>
                <SelectItem value="First Peoples">First Peoples</SelectItem>
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
          </div>
          <div className="flex items-center  gap-x-2 text-xl  rounded p-2 h-10">
            <p className="text-xs">CMCN Member?</p>

          <Checkbox checked={memberCheck} onCheckedChange={()=>setMemberCheck(!memberCheck)}/>
          </div>
        </div>
        <div className="flex flex-col col-span-1">

        <Button 
        disabled={!areaFilter && !nameFilter && !clusterFilter && !memberCheck}
        onClick={clearAllFilters}> Clear All Filters </Button>
        </div>
        
      </div>
    </div>
  );
};

export default FilterSelect;
