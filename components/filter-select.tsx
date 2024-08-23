"use client"

import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
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
import { cn, debounce } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useFilterValuesStore } from "@/hooks/use-filter-values";

 
interface FilterSelectProps {
  
}

const FilterSelect: React.FC<FilterSelectProps> = ({
 
}) => {
  const [inputValue, setInputValue] = useState<string>(''); // Temporary state for immediate input display
  const { 
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
    getCurrFilters
  } = useFilterValuesStore()

    const currFilters = getCurrFilters()

  
  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setInputValue("")
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
    const queryParams = new URLSearchParams(window.location.search);
    if (clusterFilter) {
      const formattedFilter = formatForUrl(clusterFilter);
      queryParams.set('stakeholder-group', formattedFilter);
    } else {
      queryParams.delete('stakeholder-group'); // Remove the parameter if clusterFilter is empty
    }
  
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [clusterFilter]);
  
  
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
    className="hidden md:flex flex-col p-4 h-auto w-full max-w-[50%] gap-y-2 rounded-xl border border-slate-700 bg-slate-200 relative">
     
      

      <h2 className="flex lg:flex-row flex-col items-center gap-x-1 font-light tracking-normal">Filter Stakeholders by: </h2>
         
      <div className="grid grid-cols-8 justify-around gap-x-2">
        <div className="col-span-3 flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={handleNameInputChange}
              value={inputValue}
              className="text-black bg-muted text-xs border border-slate-800"
            />
            <X
              className={cn("cursor-pointer size-4 opacity-0", nameFilter && "opacity-50")}
              onClick={() => {setNameFilter(""); setInputValue("")}}
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <Select
              onValueChange={(value) => setAreaFilter(value)}
              value={areaFilter}
            >
              <SelectTrigger className="border border-slate-800 text-muted-foreground text-xs">
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
            onValueChange={(value) => {
              setClusterFilter(value);
              setSubclusterFilter(""); // Clear dependent filter if needed
            }}
            value={clusterFilter}
          >
            <SelectTrigger className="border border-slate-800 text-muted-foreground text-xs">
              <SelectValue className="" placeholder="Stakeholder Group" />
            </SelectTrigger>
            <SelectContent>
              {stakeholderTypes.map((type) => (
                <SelectItem key={`type+${type}`} value={type}>
                  {type}
                </SelectItem>
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
              <SelectTrigger className="border border-slate-800 text-muted-foreground text-xs ">
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
              <Checkbox color="black" checked={socialsCheck} onCheckedChange={()=>setSocialsCheck(!socialsCheck)}/>
            </div>

        <Button 
        className="text-xs text-wrap border-slate-200 border h-8"
        disabled={!areaFilter && !nameFilter && !clusterFilter && !subclusterFilter && !memberCheck && !socialsCheck}
        onClick={clearAllFilters}> Reset </Button>
        </div>
        
      </div>
      <div className="flex gap-x-2 text-xs">
          {currFilters.map((filter)=>(<p key={filter} className="font-extralight opacity-80 border border-slate-500 rounded p-1 max-w-[50%] break-words">{filter}</p>))}
        </div>
      
    </div>
  );
};

export default FilterSelect;
