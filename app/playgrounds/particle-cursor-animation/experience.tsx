import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";

const ParticlesMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
  },
  vertextShader,
  fragmentShader,
);

type ParticlesMaterialType = THREE.ShaderMaterial & {
  uResolution: THREE.Vector2;
};

const PartMaterial = extend(ParticlesMaterial);

const Experience = () => {
  const particlesMaterialRef = useRef<ParticlesMaterialType>(null!);

  useFrame((state) => {
    particlesMaterialRef.current.uResolution = new THREE.Vector2(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
  });

  return (
    <>
      <color attach="background" args={["#181818"]} />

      <OrbitControls />

      <points>
        <planeGeometry args={[10, 10, 32, 32]} />
        <PartMaterial
          key={vertextShader + fragmentShader}
          ref={particlesMaterialRef}
        />
      </points>
    </>
  );
};

export default Experience;
