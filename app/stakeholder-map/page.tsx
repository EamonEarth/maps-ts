"use client";
import InfoContainer from "@/components/info-container";
import MainMap from "@/components/main-map";
import { cn } from "@/lib/utils";
import { useMap } from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

interface Coordinates {
  name: string;
  lat: number | null;
  lng: number | null;
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

    const applyFilters = () => {
      let filteredRecords = filterByRegion(areaFilter, records);
      filteredRecords = filterByName(nameFilter, filteredRecords);
      filteredRecords = filterByCluster(clusterFilter, filteredRecords);
      setFilteredRecords(filteredRecords);
    };

    applyFilters();
  }, [clusterFilter, areaFilter, nameFilter, records]);

  // KEY NAVIGATIONS
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if (!expandedRecord) return;
      const currentIndex = filteredRecords.findIndex(
        (record) => record.id === expandedRecord.id
      );

      if (event.key === "ArrowUp" && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setExpandedRecord(filteredRecords[newIndex]);
        setOpenMarker(filteredRecords[newIndex].id);
      } else if (
        event.key === "ArrowDown" &&
        currentIndex < filteredRecords.length - 1
      ) {
        const newIndex = currentIndex + 1;
        setExpandedRecord(filteredRecords[newIndex]);
        setOpenMarker(filteredRecords[newIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedRecord, filteredRecords]);

  useEffect(() => {
    if (expandedRecord) {
      const element = document.getElementById(expandedRecord.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [expandedRecord]);

  const handleClick = (record: AirtableRecord) => {
    setExpandedRecord(record);
    setOpenMarker(record.id);
    const element = document.getElementById(record.id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  
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
      <p className="w-full h-[50%] flex flex-col items-center justify-center text-xl">
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

  return (
    <div className="w-full flex flex-col md:flex-row relative ">
      {/* ALPH DIV START */}
      <div className="absolute left-0 h-[90vh] w-[20px] bg-cyan-800  flex flex-col items-center justify-between gap-y-[2px] py-4 items-center z-50 text-white/70 ">
        {alph.map((char) => (
          <div
            key={char}
            // style={{ animation: "transform 0.3s ease-in-out" }}
            className="bg-black/20 rounded p-1 w-[20px] flex items-center text-center hover:scale-120 hover:bg-black/60 transition-all cursor-pointer text-xs relative left-0 hover:left-2 "
            onClick={() => handleAlphClick(char)}
          >
            <span className="w-[10px] uppercase">

            {char}
            </span>
            
          </div>
        ))}
      </div>
      {/* ALPH END */}
      {/* TABLE START */}
      <div
        id="table"
        className="flex flex-col gap-y-6 h-[50vh] md:h-[90vh] overflow-scroll- overflow-y-auto md:p-2  w-[25%] min-w-[250px] border border-r-8 border-r-black/50 relative shrink-0 grow-0"
      >
        <h1 className="text-lg font-bold uppercase tracking-tighter ml-auto ">
          Airtable Stakeholders
        </h1>
        {filteredRecords.map((record) => (
          <div
            className={cn(
              "flex flex-col rounded p-4 border-b h-40 pl-5",
              expandedRecord.id === record.id && "bg-blue-100"
            )}
            id={record.id}
            key={record.id}
            onClick={() => handleClick(record)}
          >
            <h2 className=" text-wrap font-bold pb-2 leading-4">
              {record.fields.Stakeholders}
            </h2>
            <div className="flex flex-col gap-y-1 ">
              {record.fields.Region && (
                <span className="flex justify-between items-center">
                  <div className="text-xs ">Region: </div>
                  <div className="text-xs rounded bg-blue-300/80 px-1">
                    {" "}
                    {record.fields.Region}{" "}
                  </div>
                </span>
              )}
              {record.fields["Email address"] && (
                <span className="flex justify-between items-center gap-x-2">
                  <div className="text-xs">Email: </div>
                  <div className="text-xs text-ellipsis truncate">
                    {" "}
                    {record.fields["Email address"]}
                  </div>
                </span>
              )}
              {record.fields.Website && (
                <span className="flex justify-between items-center overflow-hidden gap-x-6">
                  <div className="text-xs">Website: </div>
                  <div className="text-xs truncate">
                    {" "}
                    {record.fields.Website}
                  </div>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-[75%] gap-x-12- justify-between shrink-0">
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