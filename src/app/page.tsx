"use client";

import { usePersonMemory } from "@/hooks/people/usePersonMemory";
import Card from "@/components/Card";

export default function Home() {
  const { person, history, loading, error, refreshUser, clearHistory } =
    usePersonMemory();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {!loading && !error && person && <Card person={person} />}

      {!loading && !error && !person && (
        <div className="border rounded shadow p-4 max-w-sm text-center">
          <p className="text-gray-600">No person data available</p>
          <p className="text-sm text-gray-500 mt-2">
            Click &quot;New Person&quot; to get started
          </p>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={refreshUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Person
        </button>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear History
          </button>
        )}
      </div>
    </main>
  );
}
