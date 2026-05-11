import Button from '../Button';
import icon from './../../assets/no-projects.png';
type EmptyListProps = {
  onStartAddProject: () => void;
};
export default function EmptyList({ onStartAddProject }: EmptyListProps) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img src={icon} className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No projects selected
      </h2>
      <h3 className="text-stone-500 mb-4">
        Select a project or get Started with a new one
      </h3>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
