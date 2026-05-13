import NewTask from './NewTask';
import { TaskObject } from '../types/Types';
type TasksProps = {
  addTask: (text: string) => void;
  tasks: TaskObject[];
  onClear: (id: number) => void;
};

export default function Tasks({ addTask, tasks, onClear }: TasksProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask addTask={addTask} />
      <p className="text-stone-800 mb-4">
        This project does not have any tasks yet
      </p>
      {tasks.length > 0 && (
        <ul>
          {tasks.map((item: TaskObject) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button onClick={() => onClear(item.id)}>Clear</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
