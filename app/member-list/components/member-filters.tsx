import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMap } from "@vis.gl/react-google-maps";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  cities,
  coastalRegions,
  landRegions,
  districts,
} from "../../../lib/data";



interface MemberFiltersProps {
  landRegionFilter: string;
  setLandRegionFilter: Dispatch<SetStateAction<string>>;
  coastRegionFilter: string;
  setCoastRegionFilter: Dispatch<SetStateAction<string>>;
  cityFilter: string;
  setCityFilter: Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  districtFilter: string;
  setDistrictFilter: Dispatch<SetStateAction<string>>;
  expandFilters: boolean;
}

const MemberFilters: React.FC<MemberFiltersProps> = ({
  landRegionFilter,
  setLandRegionFilter,
  coastRegionFilter,
  setCoastRegionFilter,
  cityFilter,
  setCityFilter,
  nameFilter,
  setNameFilter,
  districtFilter,
  setDistrictFilter,
  expandFilters
}) => {

  const handleClearAll = () => {
    setLandRegionFilter("");
    setCoastRegionFilter("");
    setCityFilter("");
    setNameFilter("");
    setDistrictFilter("");
  };
  return (
    <div 
    style={{transition: "max-height 0.5s ease-in-out,", opacity: "0.5s ease-in-out"}}
    className={cn("flex min-w-[100%] w-[100%] flex-col items-center justify-center overflow-hidden max-h-0 opacity-0", expandFilters && "max-h-[400px] opacity-100")}>
      <div className=" flex flex-col md:flex-row gap-y-2 justify-between gap-x-6 p-2">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex gap-x-1 items-center justify-end">
            <div className="text-xs opacity-70 mr-auto">Land Region:</div>

            <Select
              onValueChange={(value) => setLandRegionFilter(value)}
              value={landRegionFilter}
            >
              <SelectTrigger className="w-44 shrink-0">
                <SelectValue
                  className="placeholder-opacity-50"
                  placeholder="-"
                />
              </SelectTrigger>
              <SelectContent>
                {landRegions.map((landRegion) => (
                  <SelectItem
                    key={`${landRegion}-landRegion`}
                    value={landRegion}
                  >
                    {landRegion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setLandRegionFilter("")}
            />
          </div>
          <div className="flex gap-x-1 items-center w-[280px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Coastal Region:</div>

            <Select
              onValueChange={(value) => setCoastRegionFilter(value)}
              value={coastRegionFilter}
            >
              <SelectTrigger className="w-44 shrink-0">
                <SelectValue
                  className="placeholder-opacity-50"
                  placeholder="-"
                />
              </SelectTrigger>
              <SelectContent>
                {coastalRegions.map((coast) => (
                  <SelectItem key={`${coast}-coast`} value={coast}>
                    {coast}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setCoastRegionFilter("")}
            />
          </div>

          {/* GET LIST OF ALL CITIES */}
          <div className="flex gap-x-1 items-center w-[280px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Town/City:</div>
            <Select
              onValueChange={(value) => setCityFilter(value)}
              value={cityFilter}
            >
              <SelectTrigger className="w-44 shrink-0">
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={`${city}-city`} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setCityFilter("")}
            />
          </div>
        </div>{" "}
        {/* COLUMN TWO!COLUMN TWO!COLUMN TWO!COLUMN TWO! */}
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex gap-x-1 items-center w-[280px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Name:</div>

            <Input
              className="w-44 shrink-0"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
            />

            <X
              className="opacity-50 size-4"
              onClick={() => setLandRegionFilter("")}
            />
          </div>
          <div className="flex gap-x-1 items-center w-[280px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">District:</div>

            <Select
              onValueChange={(value) => setDistrictFilter(value)}
              value={districtFilter}
            >
              <SelectTrigger className="w-44 shrink-0">
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={`${district}+district`}value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setCoastRegionFilter("")}
            />
          </div>

          {/* GET LIST OF ALL CITIES */}
      <span className="w-full flex justify-end">
        <Button 
        disabled={!nameFilter && !landRegionFilter && !coastRegionFilter && !cityFilter && !districtFilter}
        onClick={handleClearAll}>Clear all filters</Button>
      </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default MemberFilters;