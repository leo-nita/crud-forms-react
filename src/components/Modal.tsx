import { useImperativeHandle, useRef, forwardRef, ReactNode } from 'react';
import Button from './Button';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  id: string;
};

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children, id },
  ref,
) {
  const modalRoot = document.getElementById('modal-root');
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md"
      id={id}
    >
      {children}

      <form method="dialog" className="mt-4 text-right">
        <Button>Close</Button>
      </form>
    </dialog>,
    modalRoot,
  );
});

export default Modal;
