"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";
import PlaneMesh from "./PlaneMesh";
import { useStore } from "@/zustand/store";
import { Article } from "@/types";
function TubeWithObjects({ news }: { news: Article[] }) {
  // Define a path for the tube
  const { camera, gl } = useThree();
  const path = new THREE.CurvePath();
  const points = [];

  const { pointIndex, setPointIndex } = useStore();

  for (let i = 0; i < 50; i++) {
    // Adjust this function to control the curve's shape
    // const x = i * 2 - 20 + (Math.random() - 0.5) * randomness;
    // const y = Math.sin(i * 0.5) * 10 + (Math.random() - 0.5) * randomness;
    // const z = Math.cos(i * 0.5) * 10 + (Math.random() - 0.5) * randomness;

    // points.push(new THREE.Vector3(x, y, z));
    points.push(
      new THREE.Vector3(
        i * 2 - 20,
        Math.sin(i * 0.5) * 10,
        Math.cos(i * 0.5) * 10
      )
    );
  }
  const curve = new THREE.CatmullRomCurve3(points);
  path.add(curve);
  const tubeRef = useRef<THREE.TubeGeometry>();

  const handleWheel = (event: WheelEvent) => {
    setPointIndex(event.deltaY > 0 ? 0.2 : -0.2, news.length);
  };

  useEffect(() => {
    gl.domElement.addEventListener("wheel", handleWheel);
    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [gl]);
  useFrame((delta) => {
    if (tubeRef.current) {
      const time = delta.clock.getElapsedTime();
      //   const looptime = 50;

      //   const p = scrollProgress.current;
      //   const t = (time % looptime) / looptime;
      //   const t2 = ((time + 0.1) % looptime) / looptime;
      // const pos = tubeRef.current.parameters.path.getPointAt(t);

      // if (Number(pointIndex.toFixed(2)) === Number(pointIndex.toFixed(0))) {

      const pos = tubeRef.current.parameters.path.getPointAt(
        (pointIndex % 50) / 50
      );
      camera.position.set(pos.x, pos.y, pos.z - 1.25);
      camera.lookAt(pos);
      // } else {
      // const pos = tubeRef.current.parameters.path.getPointAt(
      //   ((pointIndex + 0) % 50) / 50
      // );
      // const pos2 = tubeRef.current.parameters.path.getPointAt(
      //   ((pointIndex + 1) % 50) / 50
      // );
      // camera.position.set(pos.x, pos.y, pos.z - 1.25);
      // camera.lookAt(pos2);
      // }

      // console.log(pointIndex);

      // const pos2 = tubeRef.current.parameters.path.getPointAt(t2);
    }
  });

  return (
    <>
      <>
        <mesh>
          <tubeGeometry
            ref={tubeRef}
            args={[path as THREE.Curve<THREE.Vector3>, 64, 2, 8, true]}
          />
          <meshBasicMaterial
            color={"black"}
            transparent
            opacity={0}
            wireframe
          />
        </mesh>

        {path.getPoints(50).map((point, index) => {
          if (news && index < news?.length)
            return (
              <PlaneMesh key={index} d={news[index]} point={point}></PlaneMesh>
            );
        })}
      </>
    </>
  );
}
export default TubeWithObjects;
