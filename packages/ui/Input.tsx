import cc from "classcat";
import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

const Input = ({ id, className, register, errors, ...props }: InputProps) => {
  const err = errors[id];
  return (
    <div>
      <input
        className={cc([styles.root, className])}
        {...register(id ?? "")}
        {...props}
        aria-invalid={err ? "true" : "false"}
      />
      {err && <div role="alert">{err.message?.toString()}</div>}
    </div>
  );
};

export { Input };
