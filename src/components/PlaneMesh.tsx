import { Image, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useStore } from "../zustand/store";
function PlaneMesh({ point, d }) {
  const { pointIndex } = useStore();
  const meshRef = useRef();
  const imgRef = useRef();
  const { camera } = useThree();
  useFrame(() => {
    console.log(
      Number(pointIndex.toFixed(0)) === Number(pointIndex.toFixed(4))
    );
    if (meshRef.current) {
      // Set the mesh to look at the static position
      meshRef.current.lookAt(camera.position);
    }
    if (imgRef.current) {
      imgRef.current.material.grayscale = 1;
      imgRef.current.material.opacity = 2;
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
      <Image url={d.image_url} scale={[0.75, 1]} ref={imgRef}></Image>
      <Text
        outlineBlur={1}
        color="#FFDC00"
        fontWeight={"bold"}
        fontSize={1.05}
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
