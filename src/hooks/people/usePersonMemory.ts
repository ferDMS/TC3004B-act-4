import { useState, useEffect } from "react";
import { usePersonFetch } from "./usePersonFetch";
import { PersonResponse } from "@/types/https/people.response";
import { Person } from "@/types/people"; // Import the Person type

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

  // Transform the API response into our Person type
  const mapToPerson = (data: PersonResponse | null): Person | null => {
    if (!data || !data.results.length) return null;

    const userData = data.results[0];

    // Map the response to match our Person type
    return {
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
