'use client';

import { useState } from 'react';
import Modal from './modal';

interface ModalButton {
  children: React.ReactNode;
}

export default function ModalButton({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>버튼</button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </Modal>
    </>
  );
}
