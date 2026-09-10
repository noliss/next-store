'use client';

import NextLink from 'next/link';
import { forwardRef } from 'react';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export type LinkComponentProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export const Link = forwardRef<HTMLAnchorElement, PropsWithChildren<LinkComponentProps>>(
  function Link({ children, ...props }, ref) {
    return (
      <NextLink ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);
