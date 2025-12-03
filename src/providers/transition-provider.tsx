'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TransitionVariant = 'slide' | 'fade' | 'scale' | 'curtain' | 'wipe';

interface TransitionContextType {
  variant: TransitionVariant;
  setVariant: (variant: TransitionVariant) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<TransitionVariant>('slide');

  return (
    <TransitionContext.Provider value={{ variant, setVariant }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
}
