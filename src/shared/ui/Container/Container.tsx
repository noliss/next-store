import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Container.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  fluid?: boolean;
}

export function Container({ children, fluid = false, className = '', ...props }: ContainerProps) {
  const containerClass = `${styles.container} ${fluid ? styles.fluid : ''} ${className}`.trim();

  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
}
