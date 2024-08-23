import { AirtableRecord } from '@/app/page';
import React from 'react'

interface AlphNavProps {
  filteredRecords: AirtableRecord[];
  setExpandedRecord: (record: AirtableRecord) => void;
  setOpenMarker: (recordID: string) => void;
}

const AlphNav:React.FC<AlphNavProps> = ({
  filteredRecords,
  setExpandedRecord,
  setOpenMarker
}) => {

 const alph = "abcdefghijklmnopqrstuvwxyz".split("");
 const handleAlphClick = (char: string) => {
  const matchingRecord = filteredRecords.find(
    (record) =>
      record.fields.Stakeholder &&
      record.fields.Stakeholder.toLowerCase().startsWith(char)
  );

  if (matchingRecord) {
    setExpandedRecord(matchingRecord);
    const element = document.getElementById(matchingRecord.id);
    if (element) {
      window.scrollBy(0,-1)
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
          record.fields.Stakeholder &&
          record.fields.Stakeholder.toLowerCase().startsWith(newChar)
      );

    }

    if (newMatchingRecord) {
      setExpandedRecord(newMatchingRecord);
      const element = document.getElementById(newMatchingRecord.id);
      if (element) {
        window.scrollBy(0,-1)
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

  return (
    <div className="hidden md:flex relative left-0 h-full w-[20px] bg-gradient-to-b from-cyan-800 via-cyan-900 to-cyan-800  flex-col items-center justify-between gap-y-[2px] py-4 z-[100] text-slate-100 ">
        {alph.map((char) => (
          <div
            key={char}
            className="alph-box bg-slate-800/90 rounded-xl p-1 w-[20px] flex items-center text-center  hover:scale-150 hover:bg-black/60 transition-all cursor-pointer text-xs relative "
            onClick={() => handleAlphClick(char)}
          >
            <span className="w-[10px] uppercase text-center">
            {char}
            </span>
          </div>
        ))}
      </div>
  )
}

export default AlphNav