import { Person } from "@/types/people";
import { Avatar, Text, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  historyItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    gap: "12px",
    marginBottom: "8px",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  avatarContainer: {
    flexShrink: 0,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  name: {
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  email: {
    fontSize: "12px",
    color: "var(--colorNeutralForeground3)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

interface HistoryItemProps {
  person: Person;
  onClick: () => void;
  isActive?: boolean;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  person,
  onClick,
  isActive = false,
}) => {
  const styles = useStyles();

  return (
    <div
      className={styles.historyItem}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? "rgba(0, 0, 0, 0.05)" : undefined,
      }}
    >
      <div className={styles.avatarContainer}>
        <Avatar image={{ src: person.avatar }} name={person.name} size={28} />
      </div>
      <div className={styles.infoContainer}>
        <Text className={styles.name}>{person.name}</Text>
        <Text className={styles.email}>{person.email}</Text>
      </div>
    </div>
  );
};
