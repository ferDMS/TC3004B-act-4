import { useState, useCallback } from "react";
import axios from "axios";
import { PersonResponse } from "@/types/https/people.response";

export const usePersonFetch = () => {
  /*
    Store data in memory as state variables
    We shouldn't define our state variable the following way:

    const [data, setData] = useState(null)

    We're not using Typescript's useful type constraints
    Instead we do the following:
  */
  const [data, setData] = useState<PersonResponse | null>(null);

  // Loading boolean status.
  // - When we start retrieving we set as true
  // - After async axios respose we set as false
  // Useful for loading animations
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  /*
    Fetch API:
      1. Reset loading and error status
      2. Try fetching data
      3. Save data or catch error
      4. Turn off loading status
  */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<PersonResponse>(
        "https://randomuser.me/api/"
      );
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching user data"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};
