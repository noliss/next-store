import type { SelectHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Select.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
}

export function Select({
  children,
  fullWidth = true,
  className = '',
  ...props
}: PropsWithChildren<SelectProps>) {
  const selectClass = [styles.select, fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');

  return (
    <select className={selectClass} {...props}>
      {children}
    </select>
  );
}
