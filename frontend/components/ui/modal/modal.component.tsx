'use client';

import React, { ReactNode, useRef, useEffect } from 'react';

type Props = {
  children: ReactNode;
  showModal?: boolean;
};

const Modal: React.FC<Props> = ({ showModal, children }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialog.current) return;
    if (showModal) {
      dialog.current.showModal();
      return;
    }
    dialog.current.close();
  }, [showModal]);

  return (
    <dialog ref={dialog} className="bg-white p-6 border border rounded-md">
      {children}
    </dialog>
  );
};
export default Modal;
