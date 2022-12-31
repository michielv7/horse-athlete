'use client';

import { Toaster } from 'react-hot-toast';

export default function UserOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      {children}
    </>
  );
}
