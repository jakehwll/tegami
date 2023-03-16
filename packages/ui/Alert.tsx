import styles from "./Alert.module.css";

interface AlertProps {
  children?: React.ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return <div className={styles.root}>{children}</div>;
};

export { Alert };
