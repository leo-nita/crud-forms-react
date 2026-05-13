import { useRef } from 'react';
import { ProjectObject } from '../../types/Types';
import Input from '../Input/Input';
import Modal, { ModalHandle } from '../Modal';

type AddNewProjectProps = {
  onSaveHandle: (project: ProjectObject) => void;
  handleOnCancelProject: () => void;
};

export default function AddNewProject({
  onSaveHandle,
  handleOnCancelProject,
}: AddNewProjectProps) {
  const modal = useRef<ModalHandle | null>(null);

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  const onClickSaveButton = () => {
    const enteredTitle = title.current?.value || '';
    const enteredDescription = description.current?.value || '';
    const enteredDueDate = dueDate.current?.value || '';

    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      modal.current?.open();
      return;
    }

    onSaveHandle({
      id: Math.random(),
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  return (
    <>
      <Modal ref={modal} id="show-modal">
        <h2 className="my-4 text-xl font-bold text-stone-500" id="invalid-data">
          Invalid input
        </h2>

        <p className="mb-4 text-stone-500">
          Oops... looks like you forgot to enter a value.
        </p>

        <p className="mb-4 text-stone-500">
          Please make sure you provide valid input for every field.
        </p>
      </Modal>

      <div className="mt-16 w-[35rem]">
        <menu className="my-4 flex items-center justify-end gap-4">
          <li>
            <button
              id="onCancelProject"
              onClick={handleOnCancelProject}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>

          <li>
            <button
              id="save-button"
              onClick={onClickSaveButton}
              className="rounded-md bg-slate-800 px-6 py-2 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>

        <Input type="text" label="Title" ref={title} />

        <Input label="Description" ref={description} textArea />

        <Input type="date" label="Due date" ref={dueDate} />
      </div>
    </>
  );
}
