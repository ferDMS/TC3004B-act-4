import React, { ReactNode } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { Person } from "@/types/people";
import { HistoryItem } from "@/components/HistoryItem";

const useStyles = makeStyles({
  root: {
    border: "2px solid #ccc",
    overflow: "hidden",
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentLight: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  contentDark: {
    backgroundColor: tokens.colorNeutralBackground2, // Slightly lighter shade in dark mode
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  historyTitle: {
    fontWeight: "600",
    marginBottom: "8px",
  },
  historyList: {
    overflowY: "auto",
    paddingRight: "8px",
  },
  emptyHistory: {
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
    marginTop: "8px",
    fontSize: "14px",
  },
});

interface SidebarProps {
  children: ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  history: Person[];
  selectedPersonIndex: number | null;
  onSelectPerson: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isDarkMode,
  toggleTheme,
  history,
  selectedPersonIndex,
  onSelectPerson,
}) => {
  const styles = useStyles();

  const contentClassName = `${styles.content} ${
    isDarkMode ? styles.contentDark : styles.contentLight
  }`;

  return (
    <div className={styles.root}>
      <InlineDrawer separator open>
        <DrawerHeader>
          <div className={styles.headerContent}>
            <DrawerHeaderTitle>User History</DrawerHeaderTitle>
            <Button
              size="small"
              icon={
                isDarkMode ? <WeatherSunnyRegular /> : <WeatherMoonRegular />
              }
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDarkMode ? "Light mode" : "Dark mode"}
            />
          </div>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.drawerContent}>
            <Text className={styles.historyTitle}>Recent Users</Text>
            {history.length > 0 ? (
              <div className={styles.historyList}>
                {history.map((person, index) => (
                  <HistoryItem
                    key={`${person.name}-${index}`}
                    person={person}
                    onClick={() => onSelectPerson(index)}
                    isActive={selectedPersonIndex === index}
                  />
                ))}
              </div>
            ) : (
              <Text className={styles.emptyHistory}>
                No history yet. Generate users to see them here.
              </Text>
            )}
          </div>
        </DrawerBody>
      </InlineDrawer>

      <div className={contentClassName}>{children}</div>
    </div>
  );
};
