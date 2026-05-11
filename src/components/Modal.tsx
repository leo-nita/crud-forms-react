import { useImperativeHandle, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = forwardRef(function Modal({ children }, ref) {
  const modalRoot = document.getElementById('modal-root');
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className=" backdrop:bg-stone-900/90 p-4 rounded-md ">
      {children}
      <form method="dialog" className='"mt-4 text-right'>
        <Button>Close</Button>
      </form>
    </dialog>,
    modalRoot,
  );
});

export default Modal;
