import Spinner from '@/components/loading/spinner';

export default function ContentFallback() {
  return (
    <div className="w-full h-[calc(100vh-220px)] border col-span-3 lg:col-span-2 animate-pulse opacity-50 relative flex flex-col gap-3 p-5">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center gap-3 opacity-100">
        <Spinner /> content loading...
      </div>
      <h2 className="bg-blue-200 w-96 h-10 rounded-md opacity-50"></h2>
      <br />
      <br />
      <p className="bg-gray-200 w-[120px] h-5 rounded-md opacity-50"></p>
      <p className="bg-gray-100 w-36 h-5 rounded-md opacity-50"></p>
      <p className="bg-gray-100 w-full h-60 rounded-md opacity-50"></p>
      <br />
      <p className="bg-gray-100 w-full h-5 rounded-md opacity-50"></p>
      <p className="bg-gray-50 w-full h-5 rounded-md opacity-50"></p>
      <p className="bg-gray-100 w-56 h-5 rounded-md opacity-50"></p>
      <br />
      <h2 className="bg-green-200 w-64 h-10 rounded-md opacity-50"></h2>
      <p className="bg-gray-50 w-48 h-5 rounded-md opacity-50"></p>
      <p className="bg-gray-100 w-96 h-60 rounded-md opacity-50"></p>
    </div>
  );
}
