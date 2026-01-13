import Link from "next/link";
import playgrounds from "@/data/playgrounds";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Next.js + R3F Playgrounds</h1>
      <div className="grid gap-4 max-w-4xl">
        {playgrounds.map((playground) => (
          <Link
            key={playground.id}
            href={playground.href}
            className="block p-6 border border-gray-300 rounded-lg hover:border-gray-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">{playground.title}</h2>
            <p className="text-gray-600">{playground.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
