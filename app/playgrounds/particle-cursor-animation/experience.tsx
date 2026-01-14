import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";

const ParticlesMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
    uPictureTexture: null,
  },
  vertextShader,
  fragmentShader,
);

type ParticlesMaterialType = THREE.ShaderMaterial & {
  uResolution: THREE.Vector2;
  uPictureTexture: THREE.Texture | null;
};

const PartMaterial = extend(ParticlesMaterial);

const Experience = () => {
  const particlesMaterialRef = useRef<ParticlesMaterialType>(null!);
  const texture = useTexture("/particle-cursor-animation/picture-1.png");

  useFrame((state) => {
    particlesMaterialRef.current.uResolution = new THREE.Vector2(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
    particlesMaterialRef.current.uPictureTexture = texture;
  });

  return (
    <>
      <color attach="background" args={["#181818"]} />

      <OrbitControls />

      <points>
        <planeGeometry args={[10, 10, 128, 128]} />
        <PartMaterial
          key={vertextShader + fragmentShader}
          ref={particlesMaterialRef}
        />
      </points>
    </>
  );
};

export default Experience;
