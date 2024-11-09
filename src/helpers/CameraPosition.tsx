"use client";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Camera } from "three";

function CameraPosition({ event }: { event: string }) {
  const { camera } = useThree();
  const cameraRef = useRef<Camera>(null!);

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position;
      const roundX = Math.round(x * 100) / 100;
      const roundY = Math.round(y * 100) / 100;
      const roundZ = Math.round(z * 100) / 100;
      console.log(`${roundX},  ${roundY}, ${roundZ}, `);
    };

    cameraRef.current = camera;
    window.addEventListener(event, logCameraPosition);

    return () => {
      window.removeEventListener(event, logCameraPosition);
    };
  }, []);

  return null;
}

export default CameraPosition;
