"use client"
import CreateStakeholderModal from "@/components/create-stakeholder-modal";
// import { RelationsPicker } from "@/components/stakeholder-relations-picker";
import { Modal } from "@/components/ui/base-modal";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center">
        
      <h2 className="text-xl text-black text-center py-12 ">
        Let me know what you want on this page! Or should the map be the homepage? 
      </h2>
      
      {/* <CreateStakeholderModal/> */}
      {/* <RelationsPicker /> */}
    </div>
  );
}
