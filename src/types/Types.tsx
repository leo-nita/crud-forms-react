export type ProjectObject = {
  title: string;
  description: string;
  dueDate: string;
  id: number;
};

export type ProjectsState = {
  selectedProject: null | undefined | number;
  projects: ProjectObject[];
};
