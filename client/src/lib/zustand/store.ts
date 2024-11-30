import { create } from "zustand";
import { apiActionProps, apiActionSlices } from "./api-action-slices";

export const useApiActionStore = create<apiActionProps>((...a) => ({
  ...apiActionSlices(...a),
}));
