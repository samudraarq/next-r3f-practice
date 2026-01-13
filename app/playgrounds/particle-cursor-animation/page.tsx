"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("./experience"), { ssr: false });

const Page = () => {
  return (
    <div id="canvas-container" className="canvas-fullscreen">
      <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
        <Experience />
      </Canvas>
    </div>
  );
};
export default Page;
