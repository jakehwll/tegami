type ButtonProps = {
  children?: React.ReactNode,
  type?: 'button' | 'submit'
}

export const Button = ({ children, type }: ButtonProps) => {
  return <button type={type ?? 'button'}>{children}</button>;
};
