"use client";
import React, { useMemo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three";
// import TWEEN from "@tweenjs/tween.js";
import { greaterThan, objectScale, rotate } from "three/webgpu";
import CameraPosition from "@/helpers/CameraPosition";
import { useControls } from "leva";
import { useTh } from "leva/dist/declarations/src/styles";
import TubeWithObjects from "./TubeWithObjects";

const SceneElements = ({ table, targets, setTargets, transform }) => {
  const { camera } = useThree();
  const elements = useMemo(() => {
    const objects = [];
    const targetPositions = { table: [], sphere: [], helix: [], grid: [] };
    const vector = new THREE.Vector3();
    let j = 0;
    for (let i = 0; i < table.length; i += 5) {
      const elementData = {
        link: table[i].split("|")[0],
        imgSrc: table[i].split("|")[1],
        number: table[i + 2],
        detail: table[i + 1],
        position: [0, i, 0],
      };
      objects.push(elementData);

      // Add target positions for each layout
      // Table layout
      const tableObj = new THREE.Object3D();
      tableObj.position.set(
        table[i + 3] * 140 - 1330,
        -table[i + 4] * 180 + 990,
        0
      );
      targetPositions.table.push(tableObj);

      // Helix layout
      const cylindrical = new THREE.Cylindrical(
        900,
        i * 0.175 + Math.PI,
        -(i * 8) + 450
      );
      const helixObj = new THREE.Object3D();
      helixObj.position.setFromCylindrical(cylindrical);
      vector.copy(helixObj.position).multiplyScalar(2);
      helixObj.lookAt(vector);
      targetPositions.helix.push(helixObj);

      // Grid layout
      const gridObj = new THREE.Object3D();
      gridObj.position.set(
        (i % 5) * 400 - 800,
        -(Math.floor(i / 5) % 5) * 400 + 800,
        Math.floor(i / 25) * 1000 - 2000
      );
      targetPositions.grid.push(gridObj);
    }
    for (let i = 0; i < objects.length; i++) {
      // Sphere layout
      // const spherical = new THREE.Spherical(
      //   40,
      //   Math.acos(-1 + (2 * i) / objects.length),
      //   Math.sqrt(objects.length * Math.PI) * i
      // );
      // const sphereObj = new THREE.Object3D();
      // sphereObj.position.setFromSpherical(spherical);
      // vector.copy(sphereObj.position).multiplyScalar(2);
      // sphereObj.lookAt(vector);
      // targetPositions.sphere.push(sphereObj);
      // objects[i].position = [
      //   sphereObj?.position.x,
      //   sphereObj?.position.y,
      //   sphereObj?.position.z,
      // ];
      const cylindrical = new THREE.Cylindrical(
        40,
        i * 0.175 + Math.PI,
        -(i * 8) + 450
      );
      const helixObj = new THREE.Object3D();
      helixObj.position.setFromCylindrical(cylindrical);
      vector.copy(helixObj.position).multiplyScalar(2);
      helixObj.lookAt(vector);
      targetPositions.helix.push(helixObj);
      objects[i].position = [
        helixObj?.position.x,
        helixObj?.position.y,
        helixObj?.position.z,
      ];
    }
    setTargets(targetPositions);
    return objects;
  }, [table, setTargets]);
  const grpRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  useFrame((delta) => {
    const index = Math.abs(
      Math.round(
        (delta.clock.elapsedTime - delta.clock.startTime) %
          (elements.length - 1)
      )
    );
    if (grpRef.current) {
      grpRef.current.position.y -= 0.1;
      grpRef.current.rotation.y += 0.001;
    }
  });
  // camera.position.x = elements[0].position[0] + 5;
  // camera.position.y = elements[0].position[1];
  // camera.position.z = elements[0].position[2];
  return (
    <>
      <group ref={grpRef}>
        {elements.map((el, i) => (
          <group key={i} position={el.position}>
            {/* <Html distanceFactor={10} style={{ pointerEvents: "auto" }}>
              <div
              className="element"
              style={{
                backgroundColor: `rgba(0,127,127,${
                    Math.random() * 0.5 + 0.25
                  })`,
                  }}
                  >
                  <div className="number">{el.number}</div>
                  <div className="symbol">
                  <a href={el.link} target="_blank" rel="noopener noreferrer">
                    <img src={el.imgSrc} alt="Symbol" />
                  </a>
                </div>
                <div className="details">{el.detail}</div>
                </div>
            </Html> */}
            <mesh>
              <planeGeometry args={[3, 5]} />
              <meshBasicMaterial color="green" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};

const Scene = ({ table }) => {
  const targets = useRef({ table: [], sphere: [], helix: [], grid: [] });
  const objects = useRef([]);
  // Transformation function to animate between layouts
  const transform = (targetPositions, duration) => {
    objects.current.forEach((object, i) => {
      const target = targetPositions[i];
      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    });
    new TWEEN.Tween({})
      .to({}, duration * 2)
      .onUpdate(() => TWEEN.update())
      .start();
  };

  return (
    <>
      {/* <OrbitControls /> */}
      <CameraPosition event={"mousedown"} />

      <TubeWithObjects />

      {/* <SceneElements
        table={table}
        targets={targets.current}
        setTargets={(t) => (targets.current = t)}
        transform={transform}
      /> */}
    </>
  );
};

export default Scene;
