'use client';
import { ComponentPropsWithRef } from 'react';

interface DeleteIconButton extends ComponentPropsWithRef<'button'> {
  deleteId: number;
  icon: React.ReactNode;
  deleteApi: (commentId: number) => void;
}
export default function DeleteIconButton({ deleteId, icon, deleteApi, ...rest }: DeleteIconButton) {
  const { className } = rest;
  const deleteHandler = async () => {
    const deleteConfirm = confirm('댓글을 삭제하시겠습니까?');
    if (!deleteConfirm) {
      return;
    }
    deleteApi(deleteId);
  };

  return (
    <button className={className} onClick={deleteHandler}>
      {icon}
    </button>
  );
}
