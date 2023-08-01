import { ImSpinner3 } from 'react-icons/im';

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <ImSpinner3 className="animate-spin" />
      <span className="text-gray-400">loading edit page</span>
    </main>
  );
}
