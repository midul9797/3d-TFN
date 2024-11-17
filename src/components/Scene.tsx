"use client";

import { Article } from "@/types";
import TubeWithObjects from "./TubeWithObjects";

const Scene = ({ news }: { news: Article[] }) => {
  return (
    <>
      <TubeWithObjects news={news} />
    </>
  );
};

export default Scene;
