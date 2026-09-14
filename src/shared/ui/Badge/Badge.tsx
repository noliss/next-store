import type { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Badge.module.scss';

type BadgeVariant = 'accent' | 'danger' | 'muted';
type BadgeShape = 'tag' | 'counter';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
}

export function Badge({
  children,
  variant = 'accent',
  shape = 'tag',
  className = '',
  ...props
}: PropsWithChildren<BadgeProps>) {
  const badgeClass = [styles.badge, styles[variant], styles[shape], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
}
