import { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import fragmentShader from "./shaders/fragment.glsl";
import vertextShader from "./shaders/vertex.glsl";
import glowImage from "@/public/particle-cursor-animation/glow.png";

// Shader Material - Particles
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

// Experience Component
type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const Experience = ({ canvasRef }: Props) => {
  const texture = useTexture("/particle-cursor-animation/picture-1.png");
  const particlesMaterialRef = useRef<ParticlesMaterialType>(null!);
  const interactivePlaneRef = useRef<THREE.Mesh>(null!);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    // 2D Canvas - Initialize canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvasContextRef.current = context;

    // 2D Canvas - Initialize Glow Image
    const image = new Image();
    image.src = glowImage.src;
    image.onload = () => {
      imageRef.current = image;
    };

    // Particles - Set texture once
    if (particlesMaterialRef.current) {
      particlesMaterialRef.current.uPictureTexture = texture;
    }
  }, [canvasRef, texture]);

  useFrame((state) => {
    // Particles - Update resolution every frame, in case of window resize
    particlesMaterialRef.current.uResolution = new THREE.Vector2(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );

    // Raycaster update
    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(state.pointer, state.camera);
    // Interactive Plane - Check intersections
    const intersections = raycaster.intersectObject(
      interactivePlaneRef.current,
    );
    // If intersecting, draw glow on 2D canvas
    if (intersections.length && imageRef.current && canvasContextRef.current) {
      const uv = intersections[0].uv;

      if (uv) {
        // 2D Canvas - Fade out effect
        canvasContextRef.current.globalCompositeOperation = "source-over";
        canvasContextRef.current.globalAlpha = 0.02;
        canvasContextRef.current.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        // 2D Canvas - Draw glow on canvas
        const x = uv.x * canvasRef.current.width;
        const y = (1 - uv.y) * canvasRef.current.height;
        const glowSize = canvasRef.current.width * 0.25;

        canvasContextRef.current.globalCompositeOperation = "lighten";
        canvasContextRef.current.globalAlpha = 1;
        canvasContextRef.current.drawImage(
          imageRef.current,
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

      {/* Particles Plane */}
      <points>
        <planeGeometry args={[10, 10, 128, 128]} />
        <PartMaterial
          key={vertextShader + fragmentShader}
          ref={particlesMaterialRef}
        />
      </points>

      {/* Interactive Plane, to detect cursor intersections, then draw glow on 2D canvas */}
      <mesh ref={interactivePlaneRef} visible={false}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

export default Experience;
