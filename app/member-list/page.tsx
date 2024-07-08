"use client";
import InfoContainer from "@/components/info-container";
import MainMap from "@/components/main-map";

import React, { useEffect, useState } from "react";
import MemberList from "./components/member-list";
import FilterOptions from "./components/filter-options";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Logo {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
}

export interface Fields {
  Logo?: Logo[];
  Email?: string;
  "Are you happy for your name, about me and contact details to be shared within the network?"?: string[];
  "Coastal region"?: string[];
  Affliations?: string;
  "Primary role"?: string;
  Name?: string;
  Postcode?: string;
  "Where did you hear about the WA Coastal & Marine Network?"?: string[];
  About?: string;
  "Town/City"?: string;
  "Primary skills"?: string;
  "Environmental Interest"?: string[];
  "Land regions"?: string[];
  "I would like to receive the quarterly WA Coastal News e-publication produced by the Australian Coastal Society (WA branch)?"?: string[];
  Research?: string[];
  Region?: string;
}

export interface MemberRecord {
  id: string;
  createdTime: string;
  fields: Fields;
}

interface Coordinates {
  name: string;
  lat: number | null;
  lng: number | null;
}

const MemberPage: React.FC = () => {
  const [records, setRecords] = useState<MemberRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MemberRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, long: 0 });

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [landRegionFilter, setLandRegionFilter] = useState<string>("");
  const [coastRegionFilter, setCoastRegionFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [districtFilter, setDistrictFilter] = useState<string>("");
  const [clusterFilter, setClusterFilter] = useState<string>("");

  const defaultRecord: MemberRecord = {
    id: "",
    createdTime: "",
    fields: {},
  };
  const [expandedRecord, setExpandedRecord] =
    useState<MemberRecord>(defaultRecord);

    const airtableApiKey = process.env.AIRTABLE_API_KEY

  useEffect(() => {
    const fetchAllRecords = async () => {
      const baseUrl =
        "https://api.airtable.com/v0/appUeDvcFLgQAJBVj/tblUDr7zpyO8IxAGm";
      const headers = {
        Authorization:
          `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      };

      let allRecords: MemberRecord[] = [];
      let offset;

      do {
        const params = new URLSearchParams();
        if (offset) {
          params.append("offset", offset);
        }
        params.append("pageSize", "100"); // Maximum page size
        params.append("sort[0][field]", "Name"); // Sort by Stakeholders field
        params.append("sort[0][direction]", "asc"); // Sort direction (ascending)

        const url = `${baseUrl}?${params.toString()}`;

        try {
          console.log("current url", url);
          const response = await fetch(url, { headers });
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          allRecords = [...allRecords, ...result.records];
          offset = result.offset; // Get the offset for the next page, if any
        } catch (err: any) {
          console.log("caught");
          console.error(err.message);
          break; // Exit the loop in case of an error
        }
      } while (offset); // Continue fetching if there's an offset

      return allRecords;
    };

    const fetchData = async () => {
      try {
        const fullRecords: MemberRecord[] = await fetchAllRecords();

        setRecords(fullRecords);
        setFilteredRecords(fullRecords); // Initialize filtered records
        setExpandedRecord(fullRecords[0]); // Initialize expandedRecord to the first record
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(records);
  }, [records]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!expandedRecord) return;

      const currentIndex = filteredRecords.findIndex(
        (record) => record.id === expandedRecord.id
      );

      if (event.key === "ArrowUp" && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setExpandedRecord(filteredRecords[newIndex]);
      } else if (
        event.key === "ArrowDown" &&
        currentIndex < filteredRecords.length - 1
      ) {
        const newIndex = currentIndex + 1;
        setExpandedRecord(filteredRecords[newIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedRecord, filteredRecords]);

  if (loading)
    return (
      <p className="w-full h-[50%] flex flex-col items-center justify-center text-xl">
        <Image
          src="/logo.png"
          alt="Image of WACMN Logo"
          width={400}
          height={400}
        />
        <Loader2 className="animate-spin size-16" />
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full flex flex-col md:flex-row- items-center justify-center relative ">
      <h1 className="text-4xl font-bold uppercase text-center py-4">
        Beach Geek Directory
      </h1>
      <div className="w-full flex items-center justify-around">
        <FilterOptions
          landRegionFilter={landRegionFilter}
          setLandRegionFilter={setLandRegionFilter}
          coastRegionFilter={coastRegionFilter}
          setCoastRegionFilter={setCoastRegionFilter}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          districtFilter={districtFilter}
          setDistrictFilter={setDistrictFilter}
        />
        <div className="flex flex-col gap-y-2 items-center"> Sign up Form</div>
      </div>
      <MemberList
        records={records}
        filteredRecords={filteredRecords}
        setFilteredRecords={setFilteredRecords}
        expandedRecord={expandedRecord}
        setExpandedRecord={setExpandedRecord}
        landRegionFilter={landRegionFilter}
        coastRegionFilter={coastRegionFilter}
        cityFilter={cityFilter}
        nameFilter={nameFilter}
        districtFilter={districtFilter}
      />
    </div>
  );
};

export default MemberPage;
