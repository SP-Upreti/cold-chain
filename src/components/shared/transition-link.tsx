"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, MouseEvent } from "react";
import { useTransitionContext } from "./page-transition";

interface TransitionLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
  href: string;
  children: ReactNode;
}

export default function TransitionLink({
  href,
  children,
  target,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition } = useTransitionContext();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} target={target} {...props}>
      {children}
    </Link>
  );
}
