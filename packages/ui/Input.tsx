import cc from "classcat";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
}

const Input = ({ className, register, ...props }: InputProps) => {
  return (
    <input
      className={cc([styles.root, className])}
      {...register(props.id ?? "")}
      {...props}
    />
  );
};

export { Input };
