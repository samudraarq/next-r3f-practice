"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./experience";

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
