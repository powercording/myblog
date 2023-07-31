'use client';

import { createPortal } from 'react-dom';

interface Modal {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export default function Modal({ children, setIsOpen, isOpen }) {
  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <>
      <div className="w-screen h-screen bg-white bg-opacity-50" onClick={setIsOpen(false)} />
      <div className="">
        {children}
        fsdfsadfasfsadf fsadfsadfasd fsdafasfds
      </div>
    </>,
    document.getElementById('portal')!,
  );
}
