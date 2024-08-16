"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import bgImage from "/public/header-opac3.png"
import { stakeholderTypes, regions } from "../lib/data";
import { debounce } from "@/lib/utils";
import { useSearchParams } from "next/navigation";


interface MobileFilterSelectProps {
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
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
  socialsCheck: boolean;
  setSocialsCheck: Dispatch<React.SetStateAction<boolean>>;
  currentFilters: string[];
}

const MobileFilterSelect: React.FC<MobileFilterSelectProps> = ({
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
  setShowMobileFilters,
  socialsCheck,
  setSocialsCheck,
  currentFilters
  
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Temporary state for immediate input display

  const debouncedSetNameFilter = debounce((value: string) => {
    setNameFilter(value);
  }, 300);

  // Handle input change
  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value); // Update the input value immediately
    debouncedSetNameFilter(value); // Debounced update for nameFilter
  };

  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setClusterFilter("")
    setSubclusterFilter("")
    setMemberCheck(false)
    setSocialsCheck(false)

  }

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('stakeholder-group');
    if (query) {
      const formattedQuery = query
        .split('-')
        .map(word => {
          return word.toLowerCase() === 'and'
            ? 'and'
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
      setClusterFilter(formattedQuery);
    }
  }, [searchParams, setClusterFilter]);
  

  const formatForUrl = (text: string) => {
    return text
      .split(' ')
      .map((word) => {
        return word.toLowerCase() === 'and'
          ? 'and'
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('-');
  };

  useEffect(() => {
    if (clusterFilter) {
      const formattedFilter = formatForUrl(clusterFilter);
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('stakeholder-group', formattedFilter);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;

      window.history.replaceState(null, '', newUrl);
    }
  }, [clusterFilter]);

  return (
    <div 
    style={{
      backgroundImage: `url(${bgImage.src})`,
      backgroundSize: "100%"
    }}
    className="h-full w-full flex flex-col px-4 py-2 gap-y-2 rounded overflow-hidden ">

      <div className="flex justify-around items-center">
        <h2 className="font-bold tracking-tight">Filters:</h2>
      </div>

      <div className="flex gap-x-2 text-xs flex-wrap">
          {currentFilters.map((filter)=>(<p key={filter} className="max-w-[90%] truncate font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
      </div>
      
      <div className="flex flex-col gap-y-2">

          {/* <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={handleNameInputChange}
              value={inputValue}
              className="opacity-80"
            />
            <X
              className="opacity-50 size-4"
              onClick={() => setNameFilter("")}
            />
          </div> */}
          <div className="flex gap-x-2 items-center  overflow-hidden">
            <Select
              key={clusterFilter}
              onValueChange={(value) => setClusterFilter(value)}
              value={clusterFilter}
            >
              <SelectTrigger className="text-muted-foreground">
                <SelectValue className="" placeholder="Stakeholder Group" />
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
        
          <div className="flex gap-x-2 items-center  overflow-hidden">
            <Select
              onValueChange={(value) => setSubclusterFilter(value)}
              value={subclusterFilter}
              disabled={clusterFilter==""}
            >
              <SelectTrigger className="text-muted-foreground">
                <SelectValue className="" placeholder="Subcluster" />
              </SelectTrigger>
              <SelectContent>
                {relevantSubs.map((type)=>(
                  <SelectItem key={`type+${type}`} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
        </div>
        <div className="flex gap-x-2 items-center ">
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
              <SelectContent >
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
        <div className="flex items-center justify-around gap-x-2 text-xl  rounded p-2- ">
          {/* <div className="flex gap-x-1">
            <p className="text-xs">CMCN Member?</p>
            <Checkbox className="border-black" checked={memberCheck} onCheckedChange={()=>setMemberCheck(!memberCheck)}/>
          </div> */}
          <div className="flex gap-x-1 ">
            <p className="text-xs">Social Media?</p>
            <Checkbox className="border-black" checked={socialsCheck} onCheckedChange={()=>setSocialsCheck(!socialsCheck)}/>
          </div>
          <Button 
          className="py-2 text-xs" 
          disabled={!areaFilter && !nameFilter && !clusterFilter && !memberCheck && !socialsCheck}
          onClick={clearAllFilters}> 
            Reset 
          </Button>

          <Button 
          onClick={()=> setShowMobileFilters(false)}
          className="z-30 bg-red-400 py-2 text-white rounded cursor-pointer text-xs">
            Close 
          </Button>
        </div>
          
      </div>
    </div>
  );
};

export default MobileFilterSelect;
