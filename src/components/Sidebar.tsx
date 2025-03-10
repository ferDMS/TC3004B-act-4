import React, { ReactNode } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";

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
});

interface SidebarProps {
  children: ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isDarkMode,
  toggleTheme,
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
            <DrawerHeaderTitle>Always open</DrawerHeaderTitle>
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
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div className={contentClassName}>{children}</div>
    </div>
  );
};
