import { useState, useEffect, useRef } from "react";
import { usePersonFetch } from "./usePersonFetch";
import { PersonResponse } from "@/types/https/people.response";
import { Person } from "@/types/people";

export const usePersonMemory = () => {
  const { data, loading, error, fetchData } = usePersonFetch();
  const [history, setHistory] = useState<PersonResponse[]>([]);
  // Use a ref to track if we've done the initial fetch
  const initialFetchDone = useRef(false);

  // Fetch new person data when the component mounts, but only once
  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchData();
      initialFetchDone.current = true;
    }
  }, [fetchData]);

  // Only update history when we have new data
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

  // Transform the API response into our Person type
  const mapToPerson = (data: PersonResponse | null): Person | null => {
    if (!data || !data.results.length) return null;

    const userData = data.results[0];

    // Map the response to match our Person type
    return {
      avatar: `${userData.picture.large}`,
      name: `${userData.name.first} ${userData.name.last}`,
      email: userData.email,
      birthday: new Date(userData.dob.date).toLocaleDateString(),
      address: `${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.country}`,
      phone: userData.phone,
      password: userData.login.password,
    };
  };

  return {
    person: mapToPerson(data),
    history,
    loading,
    error,
    refreshUser,
    clearHistory,
  };
};
