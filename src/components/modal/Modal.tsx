import { useEffect, useState } from 'react';

interface Modal {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ isOpen, onClose }: Modal) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose(false);
      }
    } // 이벤트 리스너 등록과 해제를 같은 함수로 해야 하므로 onClose 를 새로운 함수로 감싼다.

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div>
      <button onClick={() => onClose(false)}>닫기</button>
      Im modal
    </div>
  );
}

function CallModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      <Modal isOpen={isOpen} onClose={setIsOpen} />;
    </>
  );
}
