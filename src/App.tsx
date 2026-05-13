import { useState } from 'react';
import AddNewProject from './components/AddNewProject/AddNewProject';
import EmptyList from './components/EmptyList/EmptyList';
import SideBar from './components/Sidebar/Sidebar';
import { ProjectsState, ProjectObject } from './types/Types';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((preState: ProjectsState) => {
      return {
        ...preState,
        selectedProject: null,
      };
    });
  }
  function handleOnCancelProject() {
    setProjectsState((preState: ProjectsState) => {
      return {
        ...preState,
        selectedProject: undefined,
      };
    });
  }
  function onClickProject(id: number) {
    setProjectsState((preState: ProjectsState) => {
      return {
        ...preState,
        selectedProject: id,
      };
    });
  }

  const handleSave = (data: ProjectObject) => {
    const newObject = {
      ...data,
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newObject],
      };
    });
  };
  function onDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          (item) => item.id !== prevState.selectedProject,
        ),
      };
    });
  }
  function onDeleteTask(id: number) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((item) => item.id !== id),
      };
    });
  }
  let content;
  const selectedProjectObject = projectsState.projects.find(
    (item) => item.id === projectsState.selectedProject,
  );

  const addTask = (text: string) => {
    if (!selectedProjectObject) return;
    const newObject = {
      text: text,
      id: Math.random(),
      selectedProjectId: selectedProjectObject.id,
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newObject],
      };
    });
  };
  content = (
    <SelectedProject
      project={selectedProjectObject}
      onDeleteProject={onDeleteProject}
      addTask={addTask}
      tasks={projectsState.tasks}
      onClear={onDeleteTask}
    />
  );
  if (projectsState.selectedProject === null) {
    content = (
      <AddNewProject
        onSaveHandle={handleSave}
        handleOnCancelProject={handleOnCancelProject}
      />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <EmptyList onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onClickProject={onClickProject}
      />
      {content}
    </main>
  );
}

export default App;
