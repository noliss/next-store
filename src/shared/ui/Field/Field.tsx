import type { LabelHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './Field.module.scss';

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode;
}

export function Field({
  label,
  className = '',
  children,
  ...props
}: PropsWithChildren<FieldProps>) {
  const fieldClass = [styles.field, className].filter(Boolean).join(' ');

  return (
    <label className={fieldClass} {...props}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  );
}
