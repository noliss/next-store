import type { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';
interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}
export function Skeleton({ width, height, radius, className = '' }: SkeletonProps) {
  const style: CSSProperties = { width, height, borderRadius: radius };
  return (
    <span className={`${styles.skeleton} ${className}`.trim()} style={style} aria-hidden="true" />
  );
}
