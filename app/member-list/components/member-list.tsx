"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MemberRecord } from "../page";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MemberListProps {
  records: MemberRecord[];
  filteredRecords: MemberRecord[];
  setFilteredRecords: Dispatch<SetStateAction<MemberRecord[]>>;
  landRegionFilter: string;
  coastRegionFilter: string;
  cityFilter: string;
  nameFilter: string;
  districtFilter: string;
}

const MemberList: React.FC<MemberListProps> = ({
  records,
  filteredRecords,
  setFilteredRecords,
  landRegionFilter,
  coastRegionFilter,
  cityFilter,
  nameFilter,
  districtFilter,
}) => {
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [noneFoundMessage, setNoneFoundMessage] = useState<boolean>(false);

  const handleImageError = (id: string) => {
    setImageLoaded((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageLoad = (id: string) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const filterByLandRegion = (
      region: string,
      records: MemberRecord[]
    ): MemberRecord[] => {
      if (!region) return records;
      return records.filter((record) =>
        record.fields["Land regions"]?.some((landRegion) =>
          landRegion.toLowerCase().includes(region.toLowerCase())
        )
      );
    };
    const filterByCoastRegion = (
      region: string,
      records: MemberRecord[]
    ): MemberRecord[] => {
      if (!region) return records;
      return records.filter((record) =>
        record.fields["Coastal region"]?.some((coastalRegion) =>
          coastalRegion.toLowerCase().includes(region.toLowerCase())
        )
      );
    };
    const filterByCity = (
      region: string,
      records: MemberRecord[]
    ): MemberRecord[] => {
      if (!region) return records;
      return records.filter((record) =>
        record.fields["Town/City"]?.toLowerCase().includes(region.toLowerCase())
      );
    };
    const filterByName = (
      name: string,
      records: MemberRecord[]
    ): MemberRecord[] => {
      if (!name) return records;
      return records.filter((record) =>
        record.fields.Name?.toLowerCase().includes(name.toLowerCase())
      );
    };
    const districtMapping: { [key: string]: string } = {
      WA: "Western Australia",
      "Western Australia": "Western Australia",
      SW: "South West",
      "South West": "South West",
      "SW/Perth Metro": "South West",
      "South/Perth Metro": "South West",
      "Perth metro": "Perth Metro",
      "Perth Metro": "Perth Metro",
    };

    // Filter function
    const filterByDistrict = (district: string, records: MemberRecord[]) => {
      if (!district) return records;
      const standardizedDistrict = districtMapping[district] || district;
      return records.filter((record) => {
        const recordRegion = record.fields.Region;
        if (!recordRegion) return false;
        const standardizedRegion =
          districtMapping[recordRegion] || recordRegion;
        return standardizedRegion
          .toLowerCase()
          .includes(standardizedDistrict.toLowerCase());
      });
    };

    const applyFilters = () => {
      let filterAppliedRecords = filterByLandRegion(landRegionFilter, records);
      filterAppliedRecords = filterByCoastRegion(
        coastRegionFilter,
        filterAppliedRecords
      );
      filterAppliedRecords = filterByCity(cityFilter, filterAppliedRecords);
      filterAppliedRecords = filterByDistrict(
        districtFilter,
        filterAppliedRecords
      );
      filterAppliedRecords = filterByName(nameFilter, filterAppliedRecords);
      setFilteredRecords(filterAppliedRecords);
      if (filterAppliedRecords.length === 0) {
        setNoneFoundMessage(true);
      } else {
        setNoneFoundMessage(false);
      }
    };

    applyFilters();
  }, [
    landRegionFilter,
    coastRegionFilter,
    cityFilter,
    records,
    nameFilter,
    districtFilter,
    setFilteredRecords,
  ]); 

  
  return (
    <div id="table" className="flex flex-col xl:grid xl:grid-cols-2 gap-x-4 gap-y-12 w-full h-screen overflow-auto md:w-[60%] lg:w-[75%] border-t-4 border-black relative bg-slate-200- mb-12 md:px-8">
      {noneFoundMessage && 
        <span className="absolute top-12 rounded-lg w-full mx-auto bg-red-200 text-center">
          <h2 className="">Unfortunately no members match your search</h2>
        </span>
      }
      
      {filteredRecords.map((record) => {
  const {
    Name,
    Logo,
    "Coastal region": coastalRegion,
    "Land regions": landRegions,
    "Town/City": townCity,
    Region,
    Affliations,
    Email
  } = record.fields;

  return (
    <div
      className={cn("flex flex-col h-auto xl:col-span-1")}
      id={record.id}
      key={record.id}
    >
      <div className="flex justify-between border-b- py-2 items-center text-center bg-slate-700 text-white px-12 rounded-lg xl:min-h-[225px]">
        <h2 className="text-lg text-wrap font-bold py-2 leading-6 md:pl-24">
          {Name}
        </h2>
        {Logo && imageLoaded[record.id] !== false && (
          <Image
            className="md:block rounded bg-white p-1"
            alt="logo"
            src={Logo[0].url}
            width={200}
            height={200}
            onError={() => handleImageError(record.id)}
            onLoad={() => handleImageLoad(record.id)}
          />
        )}
      </div>
      <div className="flex flex-col">
        {coastalRegion && (
          <span className="px-12 flex justify-between items-center bg-[#55abdd]/90 p-1 rounded-lg">
            <p className="text-sm font-semibold">Coastal Regions: </p>
            <div className="text-sm rounded flex flex-col gap-y-1 text-end">
              {coastalRegion.map((thing) => (
                <p key={`${thing}+coast`}>{thing}</p>
              ))}
            </div>
          </span>
        )}
        {landRegions && (
          <span className="rounded-lg px-12 flex justify-between items-center bg-[#7db7e4]/80 p-1">
            <p className="text-sm font-semibold">Land Regions: </p>
            <div className="text-sm rounded flex flex-col gap-y-1 text-end">
              {landRegions.map((thing) => (
                <p key={`${thing}+land`}>{thing}</p>
              ))}
            </div>
          </span>
        )}
        {townCity && (
          <span className="rounded-lg px-12 flex justify-between items-center bg-[#9dc3ea]/80 p-1">
            <p className="text-sm font-semibold">Town/City: </p>
            <p className="text-sm rounded">{townCity}</p>
          </span>
        )}
        {Region && (
          <span className="rounded-lg px-12 flex justify-between items-center bg-[#bad1ef]/80 p-1">
            <p className="text-sm font-semibold">District: </p>
            <p className="text-sm rounded">{Region}</p>
          </span>
        )}
        {Affliations && (
          <span className="rounded-lg px-12 flex flex-wrap justify-between items-center bg-[#d3def3]/80 p-1">
            <p className="text-sm font-semibold">Affiliation: </p>
            <div
              className="text-sm rounded px-1 text-end ml-auto"
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal", // Ensures that the text wraps normally
                lineHeight: "1.5", // Increases line height for better readability
              }}
            >
              {Affliations}
            </div>
          </span>
        )}
        {Email && (
          <span className="rounded-lg px-12 flex justify-between items-center bg-[#e9edf7]/80 p-1">
            <p className="text-sm font-semibold">Email: </p>
            <a href={`mailto:${Email}`} className="text-sm text-ellipsis">
              {Email}
            </a>
          </span>
        )}
      </div>
    </div>
  );
})}

    </div>
  );
};

export default MemberList;
