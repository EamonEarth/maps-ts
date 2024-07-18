"use client"

import { useState } from "react"
import { StakeholderForm } from "./create-stakeholder-form"
import { Modal } from "./ui/base-modal"
// import { RelationsPicker } from "./stakeholder-relations-picker"
// import { StakeholderRelationForm } from "./v1-relations-form"

const CreateStakeholderModal = () => {
const [isOpen, setIsOpen] = useState<boolean>(true)
const [relationList, setRelationList] = useState<string[]>([])
return (
    <Modal
    title="Test"
      description="test desc"
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}>

    <StakeholderForm 
    // records={records}
    />

    {/* <StakeholderRelationForm /> */}
    {/* <RelationsPicker /> */}
    <div className="w-full p-2">
      {relationList}
    </div>
    </Modal>
)
}

export default CreateStakeholderModal