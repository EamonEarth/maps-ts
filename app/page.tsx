"use client";
import InfoContainer from "@/components/info-container";
import MainMap from "@/components/main-map";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StakeholderTable from "@/components/stakeholder-table";
import { Button } from "@/components/ui/button";
import MobileFilterSelect from "@/components/mobile-filter-select";

export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: {
    "Email address"?: string;
    Region?: string;
    "Key Contact"?: string;
    Stakeholders?: string;
    "CMCN membership? (y/n)"?: string;
    Website?: string;
    City?: string;
    "Stakeholder cluster"?: string;
    "Stakeholder subcluster"?: string;
    "Phone number"?: string;
    "Environment and Sustainability Capacity Assessment"?: string;
    "Centre/Service/Program"?: string;
    "Field 12"?: string;
    "Field 13"?: string;
    "Field 14"?: string;
    "Field 15"?: string;
    "Field 16"?: string;
    "Field 17"?: string;
    "Field 18"?: string;
    location?: string;
    latLong?: { lat: number; long: number };
    lat?: number;
    lng?: number;
  };
}

const AirtableComponent: React.FC = () => {
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, long: 0 });

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [clusterFilter, setClusterFilter] = useState<string>("");
  const [memberCheck, setMemberCheck] = useState<boolean>(false)

  const [openMarker, setOpenMarker] = useState<string | null>(null);

  const defaultRecord: AirtableRecord = {
    id: "",
    createdTime: "",
    fields: {
      latLong: { lat: 0, long: 0 },
    },
  };
  const [expandedRecord, setExpandedRecord] =
    useState<AirtableRecord>(defaultRecord);

    // FETCHING RECORDS
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/fetchAirtableRecords');
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const fullRecords: AirtableRecord[] = await response.json();
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

  // FILTERS
  useEffect(() => {
    const filterByRegion = (
      region: string,
      records: AirtableRecord[]
    ): AirtableRecord[] => {
      if (!region) return records;
      return records.filter(
        (record) => record.fields.Region?.toLowerCase() === region.toLowerCase()
      );
    };

    const filterByName = (
      name: string,
      records: AirtableRecord[]
    ): AirtableRecord[] => {
      if (!name) return records;
      return records.filter((record) =>
        record.fields.Stakeholders?.toLowerCase().includes(name.toLowerCase())
      );
    };
    const filterByCluster = (
      cluster: string,
      records: AirtableRecord[]
    ): AirtableRecord[] => {
      if (!cluster) return records;
      return records.filter((record) =>
        record.fields["Stakeholder cluster"]
          ?.toLowerCase()
          .includes(cluster.toLowerCase())
      );
    };

    const filterByMemberCheck = (records: AirtableRecord[]) => {
      if (!memberCheck) return records
      return records.filter((record)=>record.fields["CMCN membership? (y/n)"]?.toLowerCase() === "y" )
    }

    const applyFilters = () => {
      let filteredRecords = filterByRegion(areaFilter, records);
      filteredRecords = filterByName(nameFilter, filteredRecords);
      filteredRecords = filterByCluster(clusterFilter, filteredRecords);
      filteredRecords = filterByMemberCheck(filteredRecords);
      setFilteredRecords(filteredRecords);
    };

    applyFilters();

  }, [clusterFilter, areaFilter, nameFilter, records, memberCheck]);

  const clearAllFilters = () => {
    setAreaFilter("")
    setNameFilter("")
    setClusterFilter("")
    setMemberCheck(false)
  }

  // KEY NAVIGATIONS
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if (!expandedRecord) return;
      const currentIndex = filteredRecords.findIndex(
        (record) => record.id === expandedRecord.id
      );
      
      if (event.key === "ArrowUp" && currentIndex > 0) {
        event.preventDefault()
        event.stopPropagation()
        const newIndex = currentIndex - 1;
        setExpandedRecord(filteredRecords[newIndex]);
        setOpenMarker(filteredRecords[newIndex].id);
        const element = document.getElementById(filteredRecords[newIndex].id);
        if (element) {
          if (newIndex > 2) { 

            element.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          } 
        }
        
      } else if (
        event.key === "ArrowDown" &&
        currentIndex < filteredRecords.length - 1
      ) {
        event.preventDefault()
        event.stopPropagation()
        const newIndex = currentIndex + 1;
        setExpandedRecord(filteredRecords[newIndex]);
        setOpenMarker(filteredRecords[newIndex].id);
        const element = document.getElementById(filteredRecords[newIndex].id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedRecord, filteredRecords]);

  
  // ALPH CLICK
  const alph = "abcdefghijklmnopqrtuvwxyz".split("");
  const handleAlphClick = (char: string) => {
    const matchingRecord = filteredRecords.find(
      (record) =>
        record.fields.Stakeholders &&
        record.fields.Stakeholders.toLowerCase().startsWith(char)
    );

    if (matchingRecord) {
      setExpandedRecord(matchingRecord);
      const element = document.getElementById(matchingRecord.id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
      setOpenMarker(matchingRecord.id);
    } else {
      let currentIndex = alph.indexOf(char);
      let newChar: string;
      let newMatchingRecord = null;

      while (currentIndex > 0 && !newMatchingRecord) {
        currentIndex -= 1;
        newChar = alph[currentIndex];
        newMatchingRecord = filteredRecords.find(
          (record) =>
            record.fields.Stakeholders &&
            record.fields.Stakeholders.toLowerCase().startsWith(newChar)
        );
      }

      if (newMatchingRecord) {
        setExpandedRecord(newMatchingRecord);
        const element = document.getElementById(newMatchingRecord.id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
        setOpenMarker(newMatchingRecord.id);
      }
    }
  };


  if (loading)
    return (
      <p className="w-full h-screen flex flex-col items-center justify-center text-xl">
        <Image
          src="/logo.png" 
          alt="Image of WACMN Logo"
          width={400}
          height={400}
        />
        <Loader2 className="animate-spin size-14 opacity-80" />
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  const currFilters: string[] = [];
  if (nameFilter) currFilters.push(`Name: ${nameFilter}`);
  if (areaFilter) currFilters.push(`Area: ${areaFilter}`);
  if (clusterFilter) currFilters.push(`Org. Type: ${clusterFilter}`);


  return (
    <div 
    
    className="w-full h-screen min-w-[100%] flex flex-col md:flex-row relative ">
      {/* ALPH DIV START */}
      <div className="hidden md:flex relative left-0 h-full w-[20px] bg-cyan-800  flex-col items-center justify-between gap-y-[2px] py-4 z-50 text-white/70 ">
        {alph.map((char) => (
          <div
            key={char}
            className="alph-box bg-black/20 rounded hover:rounded-r-full p-1 w-[20px] flex items-center text-center hover:scale-120 hover:bg-black/60 transition-all cursor-pointer text-xs relative left-0 hover:left-2 "
            onClick={() => handleAlphClick(char)}
          >
            <span className="w-[10px] uppercase">
            {char}
            </span>
          </div>
        ))}
      </div>
      {/* ALPH END */}
      {/* Mobile Filters */}
      <div className="relative lg:hidden z-30 text-sm top-0  flex flex-wrap items-center justify-around max-w-[100%] bg-amber-300 py-1 px-2 border-b border-black">
        <div className="flex gap-x-2 text-xs flex-wrap max-w-[100%]">
          {currFilters.map((filter)=>(<p key={filter} className="max-w-[50vw] truncate font-extralight opacity-80 border border-black rounded p-1">{filter}</p>))}
        </div>
         <div 
          onClick={()=> setShowMobileFilters(true)}
          className="ml-auto mr-2 opacity-60 bg-primary px-1 text-white rounded border cursor-pointer">
              Filters
        </div>
      </div>
      <div 
      style={{
        transition: 'max-height 0.5s ease-in-out',
      }}
      className={cn("absolute top-0 z-30 w-full h-[33%] flex flex-col items-center justify-center bg-white overflow-y-scroll border-b border-b-black max-h-0", showMobileFilters && "max-h-[33%]")}>

        <MobileFilterSelect
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          clusterFilter={clusterFilter}
          setClusterFilter={setClusterFilter}
          memberCheck={memberCheck}
          setMemberCheck={setMemberCheck}
          setShowMobileFilters={setShowMobileFilters}
          currentFilters={currFilters}
        />  
      </div>
       
      {/* TABLE START */}

      {(filteredRecords.length < 1 && !showMobileFilters) ? 
      <div className="flex flex-col justify-center items-center gap-y-2 md:gap-y-6 h-[33%] md:h-full md:p-2  md:w-[25%] min-w-[250px] md:border md:border-r-8 border-r-black/50 relative shrink-0 grow-0"
>         <div className="text-wrap text-center w-full px-4"> 
            Unfortunately no results match your search
          </div>
          <Button 
            disabled={!areaFilter && !nameFilter && !clusterFilter && !memberCheck}
            onClick={clearAllFilters}> Clear Filters 
          </Button>
      </div>
      : 
      <StakeholderTable 
      filteredRecords={filteredRecords}
      expandedRecord={expandedRecord}
      setExpandedRecord={setExpandedRecord}
      setOpenMarker={setOpenMarker}
      />
    }
      <div className="flex flex-col h-full md:w-[75%] justify-between relative -left-[1px]">
        <InfoContainer
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          record={expandedRecord}
          clusterFilter={clusterFilter}
          setClusterFilter={setClusterFilter}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          memberCheck={memberCheck}
          setMemberCheck={setMemberCheck}
        />
        <MainMap
          stakeholders={filteredRecords}
          setExpandedRecord={setExpandedRecord}
          markerCoords={markerCoords}
          openMarker={openMarker}
          setOpenMarker={setOpenMarker}
        />
      </div>
    </div>
  );
};

export default AirtableComponent;
