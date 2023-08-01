import Spinner from '@/components/loading/spinner';

export default function ContentFallback() {
  return (
    <div className="relative col-span-3 flex h-[calc(100vh-220px)] w-full animate-pulse flex-col gap-3 border p-5 opacity-50 lg:col-span-2">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 opacity-100">
        <Spinner /> content loading...
      </div>
      <h2 className="h-10 w-96 rounded-md bg-blue-200 opacity-50"></h2>
      <br />
      <br />
      <p className="h-5 w-[120px] rounded-md bg-gray-200 opacity-50"></p>
      <p className="h-5 w-36 rounded-md bg-gray-100 opacity-50"></p>
      <p className="h-60 w-full rounded-md bg-gray-100 opacity-50"></p>
      <br />
      <p className="h-5 w-full rounded-md bg-gray-100 opacity-50"></p>
      <p className="h-5 w-full rounded-md bg-gray-50 opacity-50"></p>
      <p className="h-5 w-56 rounded-md bg-gray-100 opacity-50"></p>
      <br />
      <h2 className="h-10 w-64 rounded-md bg-green-200 opacity-50"></h2>
      <p className="h-5 w-48 rounded-md bg-gray-50 opacity-50"></p>
      <p className="h-60 w-96 rounded-md bg-gray-100 opacity-50"></p>
    </div>
  );
}
