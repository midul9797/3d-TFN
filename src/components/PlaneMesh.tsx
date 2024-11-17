"use client";
import { Image, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useStore } from "../zustand/store";
import { Mesh } from "three";
import { useRouter } from "next/navigation";
function PlaneMesh({ point, d }: { point: any; d: any }) {
  const { pointIndex, setPointIndex } = useStore();
  const meshRef = useRef<Mesh>();
  const imgRef = useRef<any>();
  const { camera } = useThree();
  const router = useRouter();
  const handleClick = () => {
    setPointIndex(0, 1);
    router.push(`/category/${d.category}/${d.article_id}`);
  };
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
    if (imgRef.current) {
      imgRef.current.material.grayscale = 1;
    }
  });

  return (
    <mesh ref={meshRef} position={point}>
      {pointIndex.toFixed(0) === pointIndex.toFixed(4) && (
        <Text
          letterSpacing={0.1}
          outlineBlur={1}
          color="#FFDC00"
          fontWeight={"bold"}
          fontSize={1.05}
          scale={0.05}
          maxWidth={13}
          position={[-1, 0, 0.1]}
          anchorX="right"
          anchorY="bottom-baseline"
        >
          {d.category.toUpperCase()}
        </Text>
      )}
      <mesh
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => (document.body.style.cursor = "default")}
        onClick={handleClick}
      >
        <Image
          url={d.image_url || ""}
          scale={[0.75, 1]}
          ref={imgRef}
          crossOrigin="anonymous"
        ></Image>
      </mesh>
      <Text
        outlineBlur={1}
        color="#FFDC00"
        fontWeight={"bold"}
        fontSize={1}
        scale={0.05}
        maxWidth={13}
        position={[0, 0, 0.1]}
        anchorX="center"
        anchorY="top-baseline"
      >
        {d.title.toUpperCase()}
      </Text>
    </mesh>
  );
}
export default PlaneMesh;
