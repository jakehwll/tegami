import cc from "classcat";
import styles from "./Button.module.css";

type ButtonProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  size?: "small" | "large";
};

const Button = ({
  children,
  type,
  startIcon,
  endIcon,
  onClick,
  fullWidth = false,
  size = "small",
}: ButtonProps) => {
  return (
    <>
      <button
        className={cc([
          styles.root,
          {
            [styles.fullWidth]: fullWidth,
            [styles.sizeSm]: size === "small",
            [styles.sizeLg]: size === "large",
          },
        ])}
        onClick={onClick}
        type={type ?? "button"}
      >
        <>
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </>
      </button>
    </>
  );
};

export { Button };
