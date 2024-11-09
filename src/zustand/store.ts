import { create } from "zustand";

export const useStore = create((set) => ({
  pointIndex: 0,
  newsId: "",
  setPointIndex: (value, limit) =>
    set((state) => ({
      pointIndex:
        (state.pointIndex + value).toFixed(2) > limit - 1
          ? state.pointIndex
          : state.pointIndex + value < 0
          ? 0
          : state.pointIndex + value,
    })),
  setNewsId: (value) => set((state) => (state.newsId = value)),
}));
