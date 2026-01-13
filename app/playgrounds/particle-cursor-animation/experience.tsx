import { OrbitControls, shaderMaterial } from "@react-three/drei";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PointsMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
  },
  vertextShader,
  fragmentShader,
);

type PointsMaterialType = THREE.ShaderMaterial & {
  uResolution: THREE.Vector2;
};

extend({ PointsMaterial });

const Experience = () => {
  const pointsMaterialRef = useRef<PointsMaterialType>(null);

  useFrame((state) => {
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.uResolution = new THREE.Vector2(
        state.size.width * state.viewport.dpr,
        state.size.height * state.viewport.dpr,
      );
    }
  });

  return (
    <>
      <color attach="background" args={["#181818"]} />

      <OrbitControls />

      <points>
        <planeGeometry args={[10, 10, 32, 32]} />
        <pointsMaterial
          key={vertextShader + fragmentShader}
          ref={pointsMaterialRef}
        />
      </points>
    </>
  );
};

export default Experience;
