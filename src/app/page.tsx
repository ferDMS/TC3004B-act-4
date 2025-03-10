"use client";

import { usePersonMemory } from "@/hooks/people/usePersonMemory";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const { person, history, loading, error, refreshUser, clearHistory } =
    usePersonMemory();

  const mainContent = (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Sidebar>{mainContent}</Sidebar>
    </div>
  );
}
