import { OrbitControls } from "@react-three/drei";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const Experience = () => {
  const three = useThree();

  return (
    <>
      <color attach="background" args={["#181818"]} />

      <OrbitControls />

      <points>
        <planeGeometry args={[10, 10, 32, 32]} />
        <shaderMaterial
          vertexShader={vertextShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uResolution: new THREE.Uniform(
              new THREE.Vector2(
                three.size.width * three.viewport.dpr,
                three.size.height * three.viewport.dpr,
              ),
            ),
          }}
        />
      </points>
    </>
  );
};

export default Experience;
