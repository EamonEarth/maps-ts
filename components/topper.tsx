import { AirtableRecord } from '@/app/page';
import React from "react";
import FilterSelect from './filter-select';
import InfoContainer from './info-container';

interface TopperProps {
  record: AirtableRecord;
}

const Topper: React.FC<TopperProps> = ({
  record,
}) => {
  
  return (
    <div className="w-full h-auto min-h-[30%] xl:min-h-[25%] py-4 hidden md:flex flex-col md:flex-row gap-x-4 gap-y-6 text-slate-900">
      <FilterSelect />
      <InfoContainer record={record}/>
    </div>
  );
};

export default Topper;
