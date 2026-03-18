import { create } from "zustand";

type WidthState = {
  width: number;
  updateWidth: (newWidth: number) => void;
};

const useWidth = create<WidthState>((set) => ({
  width: 0,
  updateWidth: (newWidth: number) => set({ width: newWidth }),
}));

export default useWidth;
