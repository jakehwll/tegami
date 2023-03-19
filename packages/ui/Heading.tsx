import styles from "./Heading.module.css";

interface HeadingProps {
  children?: React.ReactNode;
}

const Heading = ({ children }: HeadingProps) => {
  return <header className={styles.root}>{children}</header>;
};

export { Heading };
