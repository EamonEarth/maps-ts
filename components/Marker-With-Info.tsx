import { AirtableRecord } from "@/app/stakeholder-map/page";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { Dispatch, SetStateAction, useCallback } from "react";

interface MarkerAndInfoProps {
  location: { lat: number; lng: number };
  title: string;
  cluster: string;
  contact: string;
  email: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

const MarkerWithInfoWindow: React.FC<MarkerAndInfoProps> = ({
  location,
  title,
  cluster,
  contact,
  email,
  isOpen,
  onClick,
  onClose,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker ref={markerRef} position={location} onClick={onClick} />

      {isOpen && (
        <InfoWindow
          headerContent={<h2 className="font-bold">{title}</h2>}
          anchor={marker}
          onClose={onClose}
          shouldFocus={false}

        >
          <div className=" flex flex-col gap-y-1">

          <p className="">{cluster}</p>
          <p>{contact}</p>
          <p className="text-blue-500 font-semibold tracking-wider">{email}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
