"use client";
import { AirtableRecord } from '@/app/page';
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import MarkerWithInfoWindow from "./Marker-With-Info";
import {Marker, MarkerClusterer} from '@googlemaps/markerclusterer';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';


interface MainMapProps {
  stakeholders: AirtableRecord[];
  markerCoords: { lat: number; long: number };
  setExpandedRecord: Dispatch<SetStateAction<AirtableRecord>>;
  openMarker: string | null;
  setOpenMarker: Dispatch<SetStateAction<string | null>>;
}

const MainMap: React.FC<MainMapProps> = ({
  stakeholders,
  setExpandedRecord, 
  openMarker,
  setOpenMarker,
}) => {


  const [googleApiKey, setGoogleApiKey] = useState<string | null>("");
  const [showPageNav, setShowPageNav] = useState<boolean>(false)
  
  useEffect(() => {
    const fetchGoogleApiKey = async () => {
      try {
        const response = await fetch('/api/googleApiKey');
        const data = await response.json();
        setGoogleApiKey(data.googleApiKey);
      } catch (error) {
        console.error('Error fetching Google API key:', error);
      }
    };

    fetchGoogleApiKey();
  }, []);

  function parseLocationString(location: string, sh: string) {
    const trimmedString = location.trim();
    const jsonString = trimmedString
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"');
      
    try {
      const parsedObject = JSON.parse(jsonString);
      return parsedObject;
    } catch (error) {
      console.log(sh)
      console.log("locay and trimmed string + json string: ", location, trimmedString, jsonString)
      console.error("Error parsing location string:", error);
      return null;
    }
  }

  const markerCompArray = stakeholders.map((place) => {
    if (place.fields.Location) {
      let parsedLocay = parseLocationString(place.fields.Location, place.fields.Stakeholder);
      const title = place.fields.Stakeholder ?? "";
      const cluster = place.fields["StakeholderGroup"] ?? "";
      const contact = place.fields["Contact"] ?? ""
      const email = place.fields["Email1"] ?? ""
      const facebook = place.fields["Facebook"] ?? ""
      const insta = place.fields["Instagram"] ?? ""
      return (
        <MarkerWithInfoWindow
          key={place.id}
          title={title}
          cluster={cluster}
          contact={contact}
          email={email}
          facebook={facebook}
          insta={insta}
          location={parsedLocay}
          isOpen={openMarker === place.id}
          onClick={() => {
            setOpenMarker(place.id);
            setExpandedRecord(place);
          }}
          onClose={() => setOpenMarker(null)}
        />
      );
    }
    return null;
  });

  

  if (!googleApiKey) return <div className="w-full flex text-center ">Loading Map...</div>
  else {

    return (
      <div 
      style={{transition: "max-height 0.5s ease-in-out"}}
      className="w-full h-full lg:h-[80%] border-t-black max-h-full relative ">
      
      <div className="absolute top-0 right-0 z-50 flex flex-col">
        <Button className="text-[8px]" onClick={()=>setShowPageNav(!showPageNav)}>
          Page Nav
        </Button>

        <div style={{transition: "opacity 0.2s ease-in-out, max-height 0.2s ease-in-out"}}
        id="pageNav" className={cn("flex flex-col bg-slate-200 z-50 opacity-0 max-h-0", showPageNav && "opacity-100 max-h-[300px]")}>
          <Button size="sm" className="text-[8px]"onClick={()=>window.scrollTo({top: 0, left: 0, behavior: "smooth"})}>
            Page Top
          </Button>
          <Button size="sm" className="text-[8px]"onClick={()=>{let table = document.getElementById("table"); table?.scrollIntoView({behavior: "smooth", block: "start"})}}>
            Filter Options
          </Button>

        </div>
      </div>

      <APIProvider apiKey={googleApiKey} libraries={["marker", "places"]}>
        <Map
          id="34a6d58b90841fba"
          mapId={"34a6d58b90841fba"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: -25.41657, lng: 123.87182 }}
          defaultZoom={4}
          gestureHandling={"greedy"}
          reuseMaps={true}
          fullscreenControl={false}
          scaleControl={true}
          >
          {markerCompArray}
        </Map>
      </APIProvider>
    </div>
  );
}
};

export default MainMap;
