import { useState } from 'react';

type TasksProps = {
  addTask: (text: string) => void;
};

export default function NewTask({ addTask }: TasksProps) {
  const [value, setValue] = useState('');
  function onClickAddTask() {
    addTask(value);
  }
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        onClick={onClickAddTask}
        className="text-stone-700 hover:text-stone-950"
      >
        Add
      </button>
    </div>
  );
}
