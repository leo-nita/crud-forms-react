export type ProjectObject = {
  title: string;
  description: string;
  dueDate: string;
};

export type ProjectsState = {
  selectedProject: null | undefined | object;
  projects: ProjectObject[];
};
