import { IoIosAdd } from 'react-icons/io';
import './sidebar.module.scss';
import Button from '../Button';
import { ProjectsState } from '../../types/Types';
type ProjectObject = {
  title: string;
  description: string;
  dueDate: string;
};
type SideBarProps = {
  onStartAddProject: () => void;
  projects: ProjectObject[];
};
export default function SideBar({ onStartAddProject, projects }: SideBarProps) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-xl">
      <h2 className="md-8 font-bold uppercase md:text-xl text-stone-200">
        Your projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>
          <IoIosAdd />
          Add Project
        </Button>
      </div>
      <ul>
        {projects.map((project) => {
          return (
            <li>
              <button className="w-full text-left px-2 py-1 rounden-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
