"use client";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
import table from "../../public/data";
import { Canvas } from "@react-three/fiber";
import data from "../../public/main.json";
import { useStore } from "@/zustand/store";
import { useEffect, useState } from "react";
export default function Home() {
  const { pointIndex } = useStore();
  const d = data.filter((content) => content.category === "world");
  return (
    <main className="h-screen  overflow-hidden">
      <Canvas
        className="bg-black"
        camera={{
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
      >
        <Scene table={table} />
      </Canvas>
      {Number(pointIndex.toFixed(0)) === Number(pointIndex.toFixed(4)) && (
        <>
          <p className="text-3xl font-bold text-yellow-500 absolute top-[50%] left-[20%] w-fit">
            {d[Number(pointIndex.toFixed(0))]?.category
              .toString()
              .toUpperCase()}
          </p>
          <div className="absolute top-[50%] left-[65%] right-[5%] text-justify transform  -translate-y-1/2">
            {d[Number(pointIndex.toFixed(0))]?.description}
          </div>
        </>
      )}
    </main>
  );
}
