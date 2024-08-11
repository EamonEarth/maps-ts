"use client";

import React, { useEffect, useState } from "react";
import MemberList from "./components/member-list";
import MemberFilters from "./components/member-filters";
import Image from "next/image";
import { Loader2, Search } from "lucide-react";
import bgImageOpac from "/public/header-opac3.png"
import memberListBackground from "/public/member-list-background.jpg"
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";


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
  const [expandFilters, setExpandFilters] = useState<boolean>(false)


  const defaultRecord: MemberRecord = {
    id: "",
    createdTime: "",
    fields: {},
  };
  const [expandedRecord, setExpandedRecord] =
    useState<MemberRecord>(defaultRecord);

    
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/fetchMemberList');
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const fullRecords: MemberRecord[] = await response.json();
          
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

  const currFilters: string[] = [];
  // const [landRegionFilter, setLandRegionFilter] = useState<string>("");
  // const [coastRegionFilter, setCoastRegionFilter] = useState<string>("");
  // const [cityFilter, setCityFilter] = useState<string>("");
  // const [nameFilter, setNameFilter] = useState<string>("");
  // const [districtFilter, setDistrictFilter] = useState<string>("");
  // const [clusterFilter, setClusterFilter] = useState<string>("");
  // const [expandFilters, setExpandFilters] = useState<boolean>(false)


  if (landRegionFilter) currFilters.push(`Land region: ${landRegionFilter}`);
  if (coastRegionFilter) currFilters.push(`Coastal region: ${coastRegionFilter}`);
  if (cityFilter) currFilters.push(`City: ${cityFilter}`);
  if (nameFilter) currFilters.push(`Name: ${nameFilter}`);
  if (districtFilter) currFilters.push(`District: ${districtFilter}`);
  if (clusterFilter) currFilters.push(`Cluster: ${clusterFilter}`);


  const handleTopScroll = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    let element = document.getElementById("table")
    if (element) {
      element.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }
  }


  if (loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-xl">
        <Image
          src="/logo.png"
          alt="Image of WACMN Logo"
          width={400}
          height={400}
        />
        <Loader2 className="animate-spin size-16" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    
    
    <div 
    style={{
      backgroundImage: `url(${bgImageOpac.src})`,
      backgroundSize: '100%', // Adjust as needed
      // backgroundPosition: 'center', // Adjust as needed
    }}
    className="w-full flex flex-col md:flex-row- items-center justify-center relative bg-slate-200">
      
      <h1 
      className="text-4xl font-bold uppercase text-center pt-4 w-full">
        Member List
      </h1>
      <div 
        onClick={()=>setExpandFilters(!expandFilters)}
        className="flex items-center gap-x-1 mx-auto cursor-pointer pb-2 text-xs md:text-sm md:hover:text-slate-500">
        <Search size="20" className="opacity-80"/> {expandFilters ? "Hide Filters" : "Show Filters"}
      </div>
      <div className="flex gap-x-2 text-xs flex-wrap max-w-[100%] justify-center px-4 pb-1">
          {currFilters.map((filter)=>(<p key={filter} className="max-w-[50vw] truncate font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
      </div>

      <div className="w-full flex items-center justify-center">
        <MemberFilters
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
          expandFilters={expandFilters}
        />
        {/* <div className="flex flex-col gap-y-2 items-center curs"> Sign up Form (tbc)</div> */}
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
      <div 
      onClick={handleTopScroll}
      className="fixed bottom-1 right-1 md:right-4 flex items-center justify-center opacity-60 bg-primary p-1 text-white rounded border cursor-pointer z-50">
        Return to top
      </div>
    </div>
  );
};

export default MemberPage;
