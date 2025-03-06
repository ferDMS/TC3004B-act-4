import { useState, useEffect } from "react";
import { usePersonFetch } from "./usePersonFetch";
import { PersonResponse } from "@/types/https/people.response";

export const usePersonMemory = () => {
  const { data, loading, error, fetchData } = usePersonFetch();
  const [history, setHistory] = useState<PersonResponse[]>([]);

  // Add to history when new data is retrieved.
  useEffect(() => {
    // Fetch new person data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setHistory((prevHistory) => [...prevHistory, data]);
    }
  }, [data]);

  const refreshUser = () => {
    fetchData();
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    person: data?.results[0] || null,
    history,
    loading,
    error,
    refreshUser,
    clearHistory,
  };
};
