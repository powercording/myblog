'use client';

interface ErrorPage {
  error: Error;
  reset: () => void;
}

export default function PageError({ error, reset }: ErrorPage) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">{error.name}</h1>
      something went wrong!
      <button className="rounded-md bg-red-400 p-2 text-white hover:bg-red-600" onClick={reset}>
        reload page
      </button>
    </div>
  );
}
