"use client";

import { usePersonMemory } from "@/hooks/people/usePersonMemory";

export default function Home() {
  const { person, history, loading, error, refreshUser, clearHistory } =
    usePersonMemory();

  return (
    <main>
      <div>Hola</div>
    </main>
  );
}
