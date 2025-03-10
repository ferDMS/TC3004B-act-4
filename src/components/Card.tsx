import { useState } from "react";
import {
  Card,
  Text,
  Button,
  Avatar,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import { EyeRegular, EyeOffRegular } from "@fluentui/react-icons";
import { Person } from "@/types/people";

const useStyles = makeStyles({
  card: {
    width: "300px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "400px", // Ensure consistent height during loading
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  avatarContainer: {
    flexShrink: 0,
  },
  userInfo: {
    flexGrow: 1,
  },
  title: {
    marginBottom: "8px",
  },
  infoRow: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
  },
  passwordRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
  },
});

interface PersonalInfoCardProps {
  person: Person | null;
  loading: boolean;
}

const PersonalInfoCard = ({ person, loading }: PersonalInfoCardProps) => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className={styles.card}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spinner size="medium" label="Loading..." />
        </div>
      ) : person ? (
        <>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <Avatar
                image={{ src: person.avatar }}
                name={person.name}
                size={72}
              />
            </div>
            <div className={styles.userInfo}>
              <Text weight="semibold" size={500}>
                {person.name}
              </Text>
            </div>
          </div>

          <div className={styles.infoRow}>
            <Text className={styles.label}>Email:</Text>
            <Text>{person.email}</Text>
          </div>

          <div className={styles.infoRow}>
            <Text className={styles.label}>Birthday:</Text>
            <Text>{person.birthday}</Text>
          </div>

          <div className={styles.infoRow}>
            <Text className={styles.label}>Address:</Text>
            <Text>{person.address}</Text>
          </div>

          <div className={styles.infoRow}>
            <Text className={styles.label}>Phone:</Text>
            <Text>{person.phone}</Text>
          </div>

          <div className={styles.passwordRow}>
            <div className={styles.passwordContainer}>
              <Text className={styles.label}>Password:</Text>
              <Text>{showPassword ? person.password : "••••••••••••"}</Text>
            </div>
            <Button
              size="small"
              icon={showPassword ? <EyeOffRegular /> : <EyeRegular />}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            />
          </div>
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <Text align="center">No user data available</Text>
        </div>
      )}
    </Card>
  );
};

export default PersonalInfoCard;
