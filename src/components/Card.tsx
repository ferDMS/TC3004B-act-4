import { useState } from "react";
import {
  Card,
  Text,
  Button,
  Avatar,
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
});

const PersonalInfoCard = () => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  // Hard coded data representing a Person
  const personData: Person = {
    name: "John Doe",
    email: "johndoe@example.com",
    birthday: "1990-01-15",
    address: "123 Main St, City, Country",
    phone: "(555) 123-4567",
    password: "secureP@ssw0rd",
    avatar:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Avatar
            image={{ src: personData.avatar }}
            name={personData.name}
            size={72}
          />
        </div>
        <div className={styles.userInfo}>
          <Text weight="semibold" size={500}>
            {personData.name}
          </Text>
        </div>
      </div>

      <div className={styles.infoRow}>
        <Text className={styles.label}>Email:</Text>
        <Text>{personData.email}</Text>
      </div>

      <div className={styles.infoRow}>
        <Text className={styles.label}>Birthday:</Text>
        <Text>{personData.birthday}</Text>
      </div>

      <div className={styles.infoRow}>
        <Text className={styles.label}>Address:</Text>
        <Text>{personData.address}</Text>
      </div>

      <div className={styles.infoRow}>
        <Text className={styles.label}>Phone:</Text>
        <Text>{personData.phone}</Text>
      </div>

      <div className={styles.passwordRow}>
        <div className={styles.passwordContainer}>
          <Text className={styles.label}>Password:</Text>
          <Text>{showPassword ? personData.password : "••••••••••••"}</Text>
        </div>
        <Button
          size="small"
          icon={showPassword ? <EyeOffRegular /> : <EyeRegular />}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        />
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
