"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MemberRecord } from "../page";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MemberListProps {
  records: MemberRecord[];
  filteredRecords: MemberRecord[];
  setFilteredRecords: Dispatch<SetStateAction<MemberRecord[]>>;
  expandedRecord: MemberRecord;
  setExpandedRecord: Dispatch<SetStateAction<MemberRecord>>;
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
  expandedRecord,
  setExpandedRecord,
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

  const handleClick = (record: MemberRecord) => {
    setExpandedRecord(record);
    const element = document.getElementById(record.id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <div id="table" className="flex flex-col gap-y-12 w-[60%] border relative">
      {noneFoundMessage ? (
        <span className="w-full h-full m-auto bg-red-200 text-center">
          <h2>Unfortunately no members match your search</h2>
        </span>
      ) : (
        <h1 className="text-3xl tracking-widest font-bold uppercase text-center  w-full py-4 -mb-12">
          Members
        </h1>
      )}
      {filteredRecords.map((record) => (
        <div
          className={cn(
            "flex flex-col rounded border-b h-auto",
            expandedRecord.id === record.id && "bg-blue-100"
          )}
          id={record.id}
          key={record.id}
          onClick={() => handleClick(record)}
        >
          <div className="flex justify-between border-b- py-2 items-center bg-slate-700 text-white px-12">
            <h2 className="text-lg text-wrap font-bold py-2 leading-4 pl-24">
              {record.fields.Name}
            </h2>
            {record.fields.Logo && imageLoaded[record.id] !== false && (
              <Image
                className="rounded bg-white p-1"
                alt="logo"
                src={record.fields.Logo[0].url}
                width={200}
                height={200}
                onError={() => handleImageError(record.id)}
                onLoad={() => handleImageLoad(record.id)}
              />
            )}
          </div>
          <div className="flex flex-col gap-y-1-  py-4-">
            {record.fields["Coastal region"] && (
              <span className="px-12 flex justify-between items-center bg-[#54abdd]/80 p-1">
                <p className="text-sm font-semibold">Coastal Regions: </p>
                <div className="text-sm rounded   flex flex-col gap-y-1 text-end">
                  {" "}
                  {record.fields["Coastal region"].map((thing) => (
                    <p key={`${thing}+coast`}>{thing}</p>
                  ))}
                </div>
              </span>
            )}
            {record.fields["Land regions"] && (
              <span className="px-12 flex justify-between items-center bg-[#bbdff0]/80 p-1">
                <p className="text-sm font-semibold">Land Regions: </p>
                <div className="text-sm rounded  flex flex-col gap-y-1 text-end">
                  {" "}
                  {record.fields["Land regions"].map((thing) => (
                    <p key={`${thing}+land`}>{thing}</p>
                  ))}{" "}
                </div>
              </span>
            )}
            {record.fields["Town/City"] && (
              <span className="px-12 flex justify-between items-center bg-slate-300/80 p-1">
                <p className="text-sm font-semibold">Town/City: </p>
                <p className="text-sm rounded ">
                  {" "}
                  {record.fields["Town/City"]}{" "}
                </p>
              </span>
            )}
            {record.fields.Region && (
              <span className="px-12 flex justify-between items-center bg-purple-200/80 p-1">
                <p className="text-sm font-semibold">District: </p>
                <p className="text-sm rounded "> {record.fields.Region} </p>
              </span>
            )}
            {record.fields.Affliations && (
              <span className="px-12 flex justify-between items-center bg-slate-200/80 p-1">
                <p className="text-sm font-semibold">Affiliation: </p>
                <p className="text-sm rounded px-1 text-end">
                  {" "}
                  {record.fields.Affliations}{" "}
                </p>
              </span>
            )}

            {record.fields.Email && (
              <span className="px-12 flex justify-between items-center bg-[#bbdff0]/80 p-1">
                <p className="text-sm font-semibold">Email: </p>
                <p className="text-sm text-ellipsis uppercase"> Email shown here</p>
                {/* <p className="text-sm text-ellipsis"> {record.fields.Email}</p> */}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
