'use client';

import { Toaster } from 'react-hot-toast';

export default function SaddlesLayout({
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
