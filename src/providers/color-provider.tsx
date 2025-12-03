"use client";
import { BRANDS } from '@/data/brand';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

export default function ColorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const brand = BRANDS.find(b => b.name.toLowerCase() === pathname.split('/')[2]?.toLowerCase());



  return (
    <>
      {children}
    </>
  )
}
