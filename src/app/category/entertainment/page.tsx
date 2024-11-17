"use client";

import { Canvas } from "@react-three/fiber";

import data from "../../../../public/main.json";
import Scene from "@/components/Scene";
import { useStore } from "@/zustand/store";
import Loader from "@/components/loading";
import { Article } from "@/types";
import { Suspense } from "react";
export default function Entertainment() {
  const { pointIndex } = useStore();
  const news = data.filter(
    (content) => content.category === "entertainment"
  ) as Article[];
  return (
    <>
      <main className="h-screen  overflow-hidden">
        <Canvas
          className="bg-red"
          camera={{
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={<Loader />}>
            <Scene news={news} />
          </Suspense>
        </Canvas>
        {Number(pointIndex.toFixed(0)) === Number(pointIndex.toFixed(4)) && (
          <>
            <p className="hidden lg:block text-3xl font-bold text-yellow-500 absolute top-[50%] left-[20%] w-fit fade">
              {news[Number(pointIndex.toFixed(0))]?.category
                .toString()
                .toUpperCase()}
            </p>
            <div className="hidden lg:block absolute top-[50%] left-[65%] right-[5%] text-justify transform  -translate-y-1/2 fade description">
              {news[Number(pointIndex.toFixed(0))]?.description}
            </div>
          </>
        )}
      </main>
    </>
  );
}
