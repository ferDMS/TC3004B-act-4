"use client";

import { useState, useEffect } from "react";
import { usePersonMemory } from "@/hooks/people/usePersonMemory";
import { Sidebar } from "@/components/Sidebar";
import PersonalInfoCard from "@/components/Card";
import { Person } from "@/types/people";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  Button,
} from "@fluentui/react-components";
import { ArrowResetRegular } from "@fluentui/react-icons";

export default function Home() {
  const { person, loading, error, refreshUser, clearHistory } =
    usePersonMemory();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(
    null
  );
  const [personHistory, setPersonHistory] = useState<Person[]>([]);

  // Transform API history to Person objects
  useEffect(() => {
    if (person && !personHistory.find((p) => p.email === person.email)) {
      setPersonHistory((prev) => [...prev, person]);
    }
  }, [person, personHistory]);

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeValue = !isDarkMode;
    setIsDarkMode(newThemeValue);
    localStorage.setItem("theme", newThemeValue ? "dark" : "light");
  };

  const handleSelectPerson = (index: number) => {
    setSelectedPersonIndex(index);
  };

  const handleClearHistory = () => {
    clearHistory();
    setPersonHistory([]);
    setSelectedPersonIndex(null);
  };

  // Display selected person or current person
  const displayPerson =
    selectedPersonIndex !== null && personHistory[selectedPersonIndex]
      ? personHistory[selectedPersonIndex]
      : person;

  const mainContent = (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <PersonalInfoCard person={displayPerson} loading={loading} />

      <div className="flex justify-center mt-5 gap-3">
        <Button
          appearance="primary"
          icon={<ArrowResetRegular />}
          onClick={() => {
            refreshUser();
            setSelectedPersonIndex(null);
          }}
        >
          New Person
        </Button>
        {personHistory.length > 0 && (
          <Button appearance="subtle" onClick={handleClearHistory}>
            Clear History
          </Button>
        )}
      </div>

      {error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
    </div>
  );

  return (
    <FluentProvider theme={isDarkMode ? teamsDarkTheme : teamsLightTheme}>
      <div className="min-h-screen">
        <Sidebar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          history={personHistory}
          selectedPersonIndex={selectedPersonIndex}
          onSelectPerson={handleSelectPerson}
        >
          {mainContent}
        </Sidebar>
      </div>
    </FluentProvider>
  );
}
