"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Experience = dynamic(() => import("./experience"), { ssr: false });

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  return (
    <div id="canvas-container" className="canvas-fullscreen">
      <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
        <Experience canvasRef={canvasRef} />
      </Canvas>

      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        className="fixed top-0 left-0 z-10 w-64 h-64"
      />
    </div>
  );
};
export default Page;
