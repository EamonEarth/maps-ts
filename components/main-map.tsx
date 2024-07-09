"use client";
import { AirtableRecord } from "@/app/stakeholder-map/page";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MarkerWithInfoWindow from "./Marker-With-Info";

const googleApiKey = process.env.GOOGLE_API_KEY

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
    if (place.fields.location) {
      let parsedLocay = parseLocationString(place.fields.location);
      const title = place.fields.Stakeholders ? place.fields.Stakeholders : "";
      const cluster = place.fields["Stakeholder cluster"]
        ? place.fields["Stakeholder cluster"]
        : "";
      const contact = place.fields["Key Contact"] ? place.fields["Key Contact"] : ""
      const email = place.fields["Email address"] ? place.fields["Email address"] : ""
      return (
        <MarkerWithInfoWindow
          key={place.id}
          title={title}
          cluster={cluster}
          contact={contact}
          email={email}
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

  if (!googleApiKey) return <>Loading...</>
  else {

    
    return (
      <div className="w-full h-[80%] mt-auto">
      <APIProvider apiKey={googleApiKey} libraries={["marker", "places"]}>
        <Map
          id="34a6d58b90841fba"
          mapId={"34a6d58b90841fba"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: -25.41657, lng: 123.87182 }}
          defaultZoom={4}
          gestureHandling={"greedy"}
          reuseMaps={true}
          >
          {markerCompArray}
        </Map>
      </APIProvider>
    </div>
  );
}
};

export default MainMap;
