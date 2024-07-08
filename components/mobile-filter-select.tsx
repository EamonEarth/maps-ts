import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface MobileFilterSelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<SetStateAction<string>>;
  clusterFilter: string;
  setClusterFilter: Dispatch<SetStateAction<string>>;
}

const MobileFilterSelect: React.FC<MobileFilterSelectProps> = ({
  areaFilter,
  setAreaFilter,
  nameFilter,
  setNameFilter,
  clusterFilter,
  setClusterFilter,
}) => {
  return (
    <div className="border flex flex-col px-4 py-2 md:w-[40%] gap-y-2 rounded absolute bottom-0">
      <h2 className="font-bold tracking-tight">Find Stakeholders:</h2>
      <div className="flex gap-x-2">
        <div className="flex flex-col gap-y-2">
          <p className="flex gap-x-2 items-center">
            <Input
              placeholder="Name"
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
            />
            <X
              className="opacity-50 size-4"
              onClick={() => setNameFilter("")}
            />
          </p>
          <p className="flex gap-x-2 items-center">
            <Select
              onValueChange={(value) => setAreaFilter(value)}
              value={areaFilter}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perth">Perth</SelectItem>
                <SelectItem value="Peel">Peel</SelectItem>
                <SelectItem value="system">Blah blah</SelectItem>
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setAreaFilter("")}
            />
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="flex gap-x-2 items-center overflow-hidden">
            <Select
              onValueChange={(value) => setClusterFilter(value)}
              value={clusterFilter}
            >
              <SelectTrigger className="w-24">
                <SelectValue className="w-24" placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="Govern">Local Government</SelectItem>
                <SelectItem value="Consult">Consultants</SelectItem>
                <SelectItem value="First People">First Peoples</SelectItem>
              </SelectContent>
            </Select>
            <X
              className="opacity-50 size-4"
              onClick={() => setClusterFilter("")}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSelect;
