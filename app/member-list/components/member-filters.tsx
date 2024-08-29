"use client"

import React, { Dispatch, SetStateAction, useEffect } from "react";
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
import { useSearchParams } from "next/navigation";




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

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('coast');
    if (query) {
      const formattedQuery = query
        .split('-')
        .map(word => {
          return word.toLowerCase() === 'and'
            ? 'and'
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
      setCoastRegionFilter(formattedQuery);
    }
  }, [searchParams, setCoastRegionFilter]);
  

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
    if (coastRegionFilter) {
      const formattedFilter = formatForUrl(coastRegionFilter);
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('coast', formattedFilter);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;

      window.history.replaceState(null, '', newUrl);
    }
  }, [coastRegionFilter]);

  const handleClearAll = () => {
    setLandRegionFilter("");
    setCoastRegionFilter("");
    setCityFilter("");
    setNameFilter("");
    setDistrictFilter("");
  };
  return (
    <div 
    style={{transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out"}}
    className={cn("flex min-w-[100%] w-[100%] flex-col items-center justify-center overflow-hidden", expandFilters ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className=" flex flex-col md:flex-row gap-y-2 justify-between gap-x-6 p-2">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex gap-x-1 items-center w-[350px] md:w-[320px] justify-end">
            <div className="text-xs opacity-70 mr-auto">Land Region:</div>

            <Select
              onValueChange={(value) => setLandRegionFilter(value)}
              value={landRegionFilter}
            >
              <SelectTrigger className="w-52 shrink-0">
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
              className="opacity-50 size-4 cursor-pointer"
              onClick={() => setLandRegionFilter("")}
            />
          </div>
          <div className="flex gap-x-1 items-center w-[350px] md:w-[320px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Coastal Region:</div>

            <Select
              key={coastRegionFilter}
              onValueChange={(value) => setCoastRegionFilter(value)}
              value={coastRegionFilter}
            >
              <SelectTrigger  className="w-52 shrink-0">
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
              className="opacity-50 size-4 cursor-pointer"
              onClick={() => setCoastRegionFilter("")}
            />
          </div>

          {/* GET LIST OF ALL CITIES */}
        </div>{" "}
        {/* COLUMN TWO!COLUMN TWO!COLUMN TWO!COLUMN TWO! */}
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex gap-x-1 items-center w-[350px] md:w-[320px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Name:</div>

            <Input
              className="w-52 shrink-0"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
            />

            <X
              className="opacity-50 size-4 cursor-pointer"
              onClick={() => setNameFilter("")}
            />
          </div>
          <div className="flex gap-x-1 items-center w-[350px] md:w-[320px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">Town/City:</div>
            <Select
              onValueChange={(value) => setCityFilter(value)}
              value={cityFilter}
            >
              <SelectTrigger className="w-52 shrink-0">
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
              className="opacity-50 size-4 cursor-pointer"
              onClick={() => setCityFilter("")}
            />
          </div>
          {/* <div className="flex gap-x-1 items-center w-[350px] md:w-[320px] justify-end ">
            <div className="text-xs opacity-70 mr-auto">District:</div>

            <Select
              onValueChange={(value) => setDistrictFilter(value)}
              value={districtFilter}
            >
              <SelectTrigger className="w-52 shrink-0">
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
              className="opacity-50 size-4 cursor-pointer"
              onClick={() => setDistrictFilter("")}
            />
          </div> */}

          {/* GET LIST OF ALL CITIES */}
        </div>
      </div>
      <span className="w-full flex justify-center pb-2 translate-x-[10px] md:translate-x-0">
        <Button 
        disabled={!nameFilter && !landRegionFilter && !coastRegionFilter && !cityFilter && !districtFilter}
        onClick={handleClearAll}>Clear all filters</Button>
      </span>
    </div>
  );
};

export default MemberFilters;
