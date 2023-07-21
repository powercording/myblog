export default async function PostLoading() {
  return (
    <main className="h-screen">
      <header className="mt-12 min-h-fit py-2 animate-pulse bg-slate-800">
        <div className="w-full 2xl:w-3/4 mx-auto h-12 p-5">
          <div className="bg-blue-950 w-96 h-10 rounded-md"></div>
        </div>
        <div className="w-full 2xl:w-3/4 mx-auto p-5 flex flex-col gap-2 mt-5">
          <div className="bg-gray-200 w-32 h-5 rounded-md animate-pulse" />
          <div className="bg-gray-200 w-40 h-5 rounded-md animate-pulse" />
        </div>
      </header>
      <div className="grid grid-cols-3 w-full 2xl:w-3/4 justify-items-center mx-auto gap-2 p-5 h-full">
        <article className="col-span-3 lg:col-span-2 w-full h-3/4 bg-black animate-pulse p-5 flex flex-col gap-3">
          <h2 className="bg-gray-400 w-96 h-10 rounded-md"></h2>
          <br />
          <br />
          <p className="bg-gray-100 w-full h-5 rounded-md"></p>
          <p className="bg-gray-200 w-36 h-5 rounded-md"></p>
          <br />
          <p className="bg-gray-200 w-full h-5 rounded-md"></p>
          <p className="bg-gray-100 w-full h-5 rounded-md"></p>
          <p className="bg-gray-200 w-56 h-5 rounded-md"></p>
          <br />
          <h2 className="bg-gray-400 w-full h-10 rounded-md"></h2>
          <p className="bg-gray-100 w-full h-5 rounded-md"></p>
          <p className="bg-gray-200 w-48 h-5 rounded-md"></p>
        </article>

        <aside className="col-span-3 lg:col-span-1 w-full p-1">
          <div className="bg-gray-900 w-full rounded-lg p-5 h-1/2 animate-pulse"></div>
        </aside>
      </div>
    </main>
  );
}
