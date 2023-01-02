'use client';

import { ForgotPasswordForm } from '#/components/login/ForgotPasswordForm';

export default function Page() {
  return (
    <div className="rounded-md bg-slate-600 p-2 text-white">
      <h1 className="text-center text-xl font-bold">Forgot password</h1>
      <ForgotPasswordForm />
    </div>
  );
}
