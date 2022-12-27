import { DetailForm } from '#/components/personal-account/DetailForm';

export default function Details() {
  return (
    <div className="rounded-md bg-slate-600 p-3 text-white">
      <h1 className="text-center text-2xl font-bold">Change information</h1>
      <DetailForm />
    </div>
  );
}
