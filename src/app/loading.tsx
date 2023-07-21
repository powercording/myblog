import { ImSpinner3 } from 'react-icons/im';

export default function MainLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center gap-4">
      <ImSpinner3 className="animate-spin" />
      <span className="text-gray-400">loading blog</span>
    </main>
  );
}
