import { create } from 'zustand';
import { relevantSubsMap, subclusterTypes } from "@/lib/data";

interface FilterValuesStore {
  areaFilter: string;
  nameFilter: string;
  clusterFilter: string;
  subclusterFilter: string;
  relevantSubs: string[];
  memberCheck: boolean;
  socialsCheck: boolean;

  setAreaFilter: (filter: string) => void;
  setNameFilter: (filter: string) => void;
  setClusterFilter: (filter: string) => void;
  setSubclusterFilter: (filter: string) => void;
  setRelevantSubs: (subs: string[]) => void;
  setMemberCheck: (check: boolean) => void;
  setSocialsCheck: (check: boolean) => void;

  clearAllFilters: () => void;

  getCurrFilters: () => string[];
}

export const useFilterValuesStore = create<FilterValuesStore>((set, get) => ({
  areaFilter: "",
  nameFilter: "",
  clusterFilter: "",
  subclusterFilter: "",
  relevantSubs: [],
  memberCheck: false,
  socialsCheck: false,

  setAreaFilter: (filter) => set({ areaFilter: filter }),
  setNameFilter: (filter) => set({ nameFilter: filter }),
  setClusterFilter: (filter) => {

    
    set({ clusterFilter: filter });

    if (filter) {
      const relevants = relevantSubsMap[filter as keyof typeof relevantSubsMap] || [];
      set({ relevantSubs: relevants });
    } else {
      set({ relevantSubs: subclusterTypes });
    }
    set({ subclusterFilter: "" });
  },
  setSubclusterFilter: (filter) => set({ subclusterFilter: filter }),
  setRelevantSubs: (subs) => set({ relevantSubs: subs }),
  setMemberCheck: (check) => set({ memberCheck: check }),
  setSocialsCheck: (check) => set({ socialsCheck: check }),

  // clearAllFilters function added here
  clearAllFilters: () => {
    set({
      areaFilter: "",
      nameFilter: "",
      clusterFilter: "",
      subclusterFilter: "",
      memberCheck: false,
      socialsCheck: false,
      relevantSubs: [],
    });
  },

  getCurrFilters: () => {
    const {
      nameFilter,
      areaFilter,
      clusterFilter,
      subclusterFilter,
      memberCheck,
      socialsCheck
    } = get();

    const currFilters: string[] = [];
    if (nameFilter) currFilters.push(`Name: ${nameFilter}`);
    if (areaFilter) currFilters.push(`Area: ${areaFilter}`);
    if (clusterFilter) currFilters.push(`Stakeholder Group: ${clusterFilter}`);
    if (subclusterFilter) currFilters.push(`Subcluster: ${subclusterFilter}`);
    // if (memberCheck) currFilters.push(`CMCN Member ✓`);
    if (socialsCheck) currFilters.push(`Socials ✓`);

    return currFilters;
  }
}));
