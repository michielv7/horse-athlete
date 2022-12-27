import { PasswordForm } from '#/components/personal-account/PasswordForm';

export default function Password() {
  return (
    <div className="rounded-md bg-slate-600 p-3 text-white">
      <h1 className="text-center text-2xl font-bold">Change your password</h1>
      <PasswordForm />
    </div>
  );
}
