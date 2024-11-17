import { Article, stateType } from "@/types";
import { create } from "zustand";

export const useStore = create<stateType>((set) => ({
  pointIndex: 0,
  newsId: "",
  news: [],
  category: "",
  setPointIndex: (value: number, limit: number) =>
    set((state: stateType) => ({
      pointIndex:
        Number((state.pointIndex + value).toFixed(2)) > limit - 1
          ? state.pointIndex
          : state.pointIndex + value < 0
          ? 0
          : state.pointIndex + value,
    })),
  setNewsId: (value: string) =>
    set((state: stateType) => ({ ...state, newsId: value })),
  setCategory: (value: string) =>
    set((state: stateType) => ({ ...state, category: value })),
  setNews: (value: Article[]) =>
    set((state: stateType) => ({ ...state, news: value, pointIndex: 0 })),
}));
