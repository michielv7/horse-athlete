'use client';

import { Toaster } from "react-hot-toast";

export default function EditSaddleLayout({
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
