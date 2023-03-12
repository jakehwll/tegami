import styles from "./Card.module.css";

interface CardProps {
  children?: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className={styles.root}>{children}</div>;
};

export { Card };
