'use client';

import { ResetPasswordForm } from '#/components/reset-password/ResetPasswordForm';

export default function Page() {
  return (
    <div className="rounded-md bg-slate-600 p-2 text-white">
      <h1 className="mb-2 text-center text-xl font-bold">Reset password</h1>
      <ResetPasswordForm />
    </div>
  );
}
