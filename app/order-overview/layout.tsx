'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export default function OrderOverviewLayout({ children }: { children: ReactNode; }) { return (
  <>
    <Toaster position='top-center' reverseOrder={true} />
    {children}
  </>
)}
