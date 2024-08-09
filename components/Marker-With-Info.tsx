import { AirtableRecord } from '@/app/page';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import facebookIcon from "/public/facebook.svg"
import instaIcon from "/public/instagram.svg"
import Link from 'next/link';
import Image from 'next/image';

interface MarkerAndInfoProps {
  location: { lat: number; lng: number };
  title: string;
  cluster: string;
  contact: string;
  email: string;
  facebook: string;
  insta: string;
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
  facebook,
  insta,
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
          headerContent={<h2 className="font-bold max-w-[300px] pb-2">{title}</h2>}
          anchor={marker}
          onClose={onClose}
          shouldFocus={false}

        >
          <div className=" flex flex-col items-center justify-center gap-y-1 rounded bg-slate-200 border border-slate-300 pt-2 p-1 pr-2">

            <p className="">{cluster}</p>
            <p>{contact}</p>
            <p className="text-blue-500 font-semibold tracking-wider">{email}</p>
            {(facebook || insta) && 
            <div className="flex items-center w-fit gap-x-4 px-2  py-1 border border-slate-400 rounded">
              {facebook && 
              <Link href={facebook} target='_blank'>
                <Image src={facebookIcon.src} alt="facebook icon" height={20} width={20}/>
              </Link>
              }
              {insta && 
              <Link href={insta} target='_blank'>
                <Image src={instaIcon.src} alt="instagram icon" height={20} width={20}/>
              </Link>
              }
            </div>  
            }

          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
