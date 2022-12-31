'use client';

import { Toaster } from "react-hot-toast";

export default function CreateSaddleLayout({
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
