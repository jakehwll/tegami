import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  children?: React.ReactNode;
  open: boolean;
  setter(val: boolean): void;
}

const Dialog = ({ children, open, setter }: DialogProps) => {
  const rootRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (open) {
      !rootRef.current.open && rootRef.current.showModal();
    } else {
      rootRef.current.close();
      setter(false);
    }
  }, [open]);

  return (
    <dialog className={styles.root} onClose={() => setter(false)} ref={rootRef}>
      {children}
    </dialog>
  );
};

export { Dialog };
