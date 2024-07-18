// "use client"

// import { locations } from "@/lib/data"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select";
// import { useState } from "react";
// import { Input } from "./ui/input";

// const stakeholders: string[] = []
// locations.forEach((location)=>{stakeholders.push(location.fields.Stakeholders)})
// // console.log(stakeholders)

// export const RelationsPicker = () => {

//     const [chosenRelations, setChosenRelations] = useState<string[]>([])
//     const [filteredStakeholders, setFilteredStakeholders] = useState<string[]>(stakeholders)

//     const handleFilter = (query: string) => {
//         let newStakeholders = filteredStakeholders.filter((sh)=>sh.toLowerCase().includes(query.toLowerCase()))
//         setFilteredStakeholders(newStakeholders)
//     }

//     const addRelation = (sh: string) => {
//         let newRelations = [...chosenRelations]
//         newRelations.push(sh)
//         console.log("new rels", newRelations)
//         setChosenRelations(newRelations)
//         console.log("chosen", chosenRelations)

//     }
//     return (
// <div className="flex flex-col items-center gap-y-4">
//         <div>
//             SH to add relations from
//         </div>
//         <div className="flex flex-col gap-y-1">
//             <Input onChange={(query)=>handleFilter(query.target.value)}/>
//             <Select>
//                 <SelectTrigger>
//                     {/* <SelectValue placeholder="Choose SH"/> */}
//                 </SelectTrigger>
//                 <SelectContent>
//                     {filteredStakeholders.map((sh)=><SelectItem  onClick={() => addRelation(sh)} key={sh} value={sh}>{sh}</SelectItem>)}
//                 </SelectContent>

//             </Select>
//             {chosenRelations}

//         </div>
// </div>
//     )
// }
