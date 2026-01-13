"use client";

import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Page = () => {
  return (
    <div id="canvas-container" className="canvas-fullscreen">
      <Canvas>
        <OrbitControls />

        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
};
export default Page;
