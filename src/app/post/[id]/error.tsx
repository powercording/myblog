'use client';

interface ErrorPage {
  error: Error;
  reset: () => void;
}

export default function PageError({ error, reset }: ErrorPage) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-xl">{error.name}</h1>
      something went wrong!
      <button className="p-2 bg-red-400 text-white rounded-md hover:bg-red-600" onClick={reset}>
        reload page
      </button>
    </div>
  );
}
