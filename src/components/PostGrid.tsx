import React from 'react';

interface PostGridProps {
  leftMenu: React.ReactNode;
  children: React.ReactNode;
  rightMenu: React.ReactNode;
}

export default function PostGrid({ leftMenu, children, rightMenu }: PostGridProps) {
  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-between px-3 py-9  md:p-12">
      <div className="mx-auto grid h-auto min-h-screen w-full grid-cols-5 gap-3 py-12 xl:w-4/6">
        <aside className="hidden md:col-span-1 md:block">
          <div className="sticky top-12 p-3">{leftMenu}</div>
        </aside>
        <article className="col-span-5 flex flex-col gap-3 md:col-span-3">{children}</article>
        <aside className="hidden md:col-span-1 md:block">
          <div className="sticky top-12 p-3">{rightMenu}</div>
        </aside>
        <div className="md:hidden"></div>
      </div>
    </main>
  );
}
