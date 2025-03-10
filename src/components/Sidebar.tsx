import React, { ReactNode } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles,
} from "@fluentui/react-components";

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
});

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <InlineDrawer separator open>
        <DrawerHeader>
          <DrawerHeaderTitle>Always open</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
