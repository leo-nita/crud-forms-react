import { ProjectObject } from '../../types/Types';
import Input from '../Input/Input';
import { useRef } from 'react';
import Modal from '../Modal';

type AddNewProjectProps = {
  onSaveHandle: (arg0: ProjectObject) => void;
  handleOnCancelProject: () => void;
};

export default function AddNewProject({
  onSaveHandle,
  handleOnCancelProject,
}: AddNewProjectProps) {
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const dueDate = useRef<HTMLInputElement | null>(null);

  const onClickSaveButton = () => {
    const enteredTitle = title.current?.value || '';
    const enteredDescription = description.current?.value || '';
    const enteredDueDate = dueDate.current?.value || '';
    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() == '' ||
      enteredDueDate.trim() === ''
    ) {
      modal.current.open();
      return;
    }
    onSaveHandle({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-500 my-4">Invalid input</h2>
        <p className="text-stone-500 mb-4">
          Oops ... looks like you forgot to enter a value
        </p>
        <p className="text-stone-500 mb-4">
          Please make sure you provide a valid input
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={handleOnCancelProject}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={onClickSaveButton}
              className="px-6 py-2 rounded-md bg-slate-800 text-stone-50  hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <Input type="text" label={'Title'} ref={title} />
        <Input label={'Description'} ref={description} textArea />
        <Input type="date" label={'Due date'} ref={dueDate} />
      </div>
    </>
  );
}
