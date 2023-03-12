import cc from "classcat";
import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => {
  return <input className={cc([styles.root, className])} {...props} />;
};

export { Input };
