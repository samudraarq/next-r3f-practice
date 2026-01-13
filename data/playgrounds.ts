export interface Playground {
  id: string;
  title: string;
  href: string;
  description: string;
}

const playgrounds: Playground[] = [
  {
    id: "particle-cursor-animation",
    title: "Particle Cursor Animation",
    href: "/playgrounds/particle-cursor-animation",
    description:
      "A playground demonstrating particle effects that follow the cursor movement. Taken from the Three.js journey Chapter 04 - Shaders - Particles Cursor Animation. Recreated in Next.js and React Three Fiber.",
  },
];

export default playgrounds;
