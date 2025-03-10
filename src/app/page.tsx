"use client";

import { useState, useEffect } from "react";
import { usePersonMemory } from "@/hooks/people/usePersonMemory";
import { Sidebar } from "@/components/Sidebar";
import PersonalInfoCard from "@/components/Card";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";

export default function Home() {
  const { person, history, loading, error, refreshUser, clearHistory } =
    usePersonMemory();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const mainContent = (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <PersonalInfoCard />
    </div>
  );

  return (
    <FluentProvider theme={isDarkMode ? teamsDarkTheme : teamsLightTheme}>
      <div className="min-h-screen">
        <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
          {mainContent}
        </Sidebar>
      </div>
    </FluentProvider>
  );
}
