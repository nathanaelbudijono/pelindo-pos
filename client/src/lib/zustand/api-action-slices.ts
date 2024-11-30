import { StateCreator } from "zustand";

export interface apiActionProps {
  isAction: boolean;
  setIsAction: (isAction: boolean) => void;
}

export const apiActionSlices: StateCreator<apiActionProps> = (set) => ({
  isAction: false,
  setIsAction: (isAction) => set({ isAction }),
});
