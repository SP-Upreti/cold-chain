import React from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react';
import { TransitionLink } from '../shared';
import { usePathname } from 'next/navigation';

interface CustomBreadcrumbProps {
  paths: { name: string; href: string }[]
  className?: string,
  onClick?: () => void
}

export default function CustomBreadcrumb({ paths, className, onClick }: CustomBreadcrumbProps) {
  const pathname = usePathname()
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center bg-muted/80', className)}>
      <ol className="flex items-center gap-1 max-w-7xl mx-auto w-full">

        {paths?.map((path, idx) => {
          const isLast = idx === paths.length - 1

          return (
            <React.Fragment key={idx}>

              <li className="flex items-center">
                {isLast ? (
                  <span className="text-sm font-medium text-primary px-1">
                    {path.name}
                  </span>
                ) : (
                  <TransitionLink
                    href={path.href}
                    className="text-sm font-medium text-zinc-600 hover:text-primary px-1  rounded-md hover:bg-zinc-50 transition-all duration-200"
                  >
                    {path.name}
                  </TransitionLink>
                )}
              </li>
              {!isLast && (
                <li className="flex items-center text-zinc-400" aria-hidden="true">
                  <Icon icon="solar:alt-arrow-right-linear" width="16" height="16" />
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>

      {pathname == "/products" && (
        <li className='list-none lg:hidden'>{/* Mobile Filter Toggle Button */}
          <button
            onClick={onClick}
            className="lg:hidden text-primary transition-colors"
            aria-label="Toggle filters"
          >
            <Icon icon="lets-icons:filter" className="size-5" />
          </button></li>
      )}
    </nav>
  )
}
