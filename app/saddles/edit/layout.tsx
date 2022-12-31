'use client';

import { Toaster } from "react-hot-toast";

export default function EditSaddlesLayout({
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
