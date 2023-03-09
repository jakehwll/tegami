import styles from './Button.module.css'

type ButtonProps = {
  startIcon?: React.ReactNode,
  endIcon?: React.ReactNode,
  children?: React.ReactNode,
  type?: 'button' | 'submit',
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ children, type, startIcon, endIcon, onClick }: ButtonProps) => {
  return <>
    <button className={styles.root} onClick={onClick} type={type ?? 'button'}>
      <>
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </>
    </button>
  </>;
};
