'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './ProductImage.module.scss';
interface ProductImageProps {
  src: string | null;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}
export function ProductImage({ src, alt = '', sizes, priority = false }: ProductImageProps) {
  const [isBroken, setIsBroken] = useState(false);

  if (!src || isBroken) {
    return <span className={styles.fallback}>Нет фото</span>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={styles.image}
      onError={() => setIsBroken(true)}
    />
  );
}
