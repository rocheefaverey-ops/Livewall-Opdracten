import React, { ReactNode, useRef, useEffect } from 'react';
import classes from './modal.module.css';

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
    <dialog ref={dialog} className={classes.modal}>
      {children}
    </dialog>
  );
};
export default Modal;
