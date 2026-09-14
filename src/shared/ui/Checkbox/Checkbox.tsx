import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <label className={rootClass} htmlFor={id}>
      <input type="checkbox" id={id} className={styles.input} {...props} />
      <span className={styles.text}>{label}</span>
    </label>
  );
}
