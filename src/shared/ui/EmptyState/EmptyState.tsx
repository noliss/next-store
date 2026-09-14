import type { AriaRole, ReactNode } from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  role?: AriaRole;
}

export function EmptyState({ title, description, action, role = 'status' }: EmptyStateProps) {
  return (
    <div className={styles.emptyState} role={role}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
