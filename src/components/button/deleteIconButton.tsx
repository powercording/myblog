'use client';

import commentService from '@/app/service/CommentService';
import { ComponentPropsWithRef } from 'react';

interface DeleteIconButton extends ComponentPropsWithRef<'button'> {
  deleteId: number;
  deleteApi: string;
  icon: React.ReactNode;
}
export default function DeleteIconButton({ deleteId, deleteApi, icon, ...rest }: DeleteIconButton) {
  const { className } = rest;
  const deleteHandler = async () => {
    const deleteConfirm = confirm('댓글을 삭제하시겠습니까?');
    if (!deleteConfirm) {
      return;
    }
    await commentService.deleteComment(deleteApi, deleteId);
  };

  return (
    <button className={className} onClick={deleteHandler}>
      {icon}
    </button>
  );
}
