import { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";
import glowImage from "@/public/particle-cursor-animation/glow.png";

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

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const Experience = ({ canvasRef }: Props) => {
  const particlesMaterialRef = useRef<ParticlesMaterialType>(null!);
  const texture = useTexture("/particle-cursor-animation/picture-1.png");
  const interactivePlaneRef = useRef<THREE.Mesh>(null!);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const image = new Image();
  image.src = glowImage.src;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvasContextRef.current = context;
  }, [canvasRef]);

  const raycaster = new THREE.Raycaster();

  useFrame((state) => {
    particlesMaterialRef.current.uResolution = new THREE.Vector2(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
    particlesMaterialRef.current.uPictureTexture = texture;

    // Raycaster update
    raycaster.setFromCamera(state.pointer, state.camera);
    const intersections = raycaster.intersectObject(
      interactivePlaneRef.current,
    );
    if (intersections.length) {
      const uv = intersections[0].uv;

      if (uv && canvasContextRef.current) {
        const x = uv.x * canvasRef.current.width;
        const y = (1 - uv.y) * canvasRef.current.height;
        const glowSize = canvasRef.current.width * 0.25;

        // Draw on canvas
        canvasContextRef.current.globalCompositeOperation = "lighten";
        canvasContextRef.current.drawImage(
          image,
          x - glowSize / 2,
          y - glowSize / 2,
          glowSize,
          glowSize,
        );
      }
    }
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

      {/* Interactive Plane */}
      <mesh ref={interactivePlaneRef}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

export default Experience;
