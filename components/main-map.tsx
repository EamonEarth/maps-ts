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
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
}

const MainMap: React.FC<MainMapProps> = ({
  stakeholders,
  setExpandedRecord, 
  openMarker,
  setOpenMarker,
  setShowMobileFilters,
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

  function parseLocationString(location: string) {
    const trimmedString = location.trim();
    const jsonString = trimmedString
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"');
      
    try {
      const parsedObject = JSON.parse(jsonString);
      return parsedObject;
    } catch (error) {
      console.error("Error parsing location string:", error);
      return null;
    }
  }

  const markerCompArray = stakeholders.map((place) => {
    const {
      Stakeholder,
      CMCN,
      Region,
      City,
      StakeholderGroup,
      Contact,
      Email1,
      Website,
      Facebook,
      Instagram,
    } = place.fields; 
    if (place.fields.Location) {
      let parsedLocay = parseLocationString(place.fields.Location);
      const title = Stakeholder ?? "";
      const cluster = StakeholderGroup ?? "";
      const contact = Contact ?? ""
      const email = Email1 ?? ""
      const facebook = Facebook ?? ""
      const insta = Instagram ?? ""
      const website = Website ?? ""
      return (
        <MarkerWithInfoWindow
          key={place.id}
          title={title}
          website={website}
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
      onClick={()=>setShowMobileFilters(false)}
      style={{transition: "max-height 0.5s ease-in-out"}}
      className="md:w-[90%] overflow-hidden h-full border-slate-700 border rounded-xl max-h-full relative z-40">
      


      <APIProvider apiKey={googleApiKey} libraries={["marker", "places"]}>
        <Map
          id="34a6d58b90841fba"
          mapId={"34a6d58b90841fba"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: -25.41657, lng: 123.87182 }}
          defaultZoom={4}
          gestureHandling={"greedy"}
          reuseMaps={true}
          mapTypeControl={false}
          fullscreenControl={false}
          scaleControl={true}
          zoomControl={false}
          streetViewControl={false}
          
          >
          {markerCompArray}
        </Map>
      </APIProvider>
    </div>
  );
}
};

export default MainMap;
