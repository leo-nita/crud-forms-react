import { useState } from 'react';
import AddNewProject from './components/AddNewProject/AddNewProject';
import EmptyList from './components/EmptyList/EmptyList';
import SideBar from './components/Sidebar/Sidebar';
import { ProjectsState, ProjectObject } from './types/Types';

function App() {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    selectedProject: undefined,
    projects: [],
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

  const handleSave = (data: ProjectObject) => {
    const newObject = {
      ...data,
      id: Math.random(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newObject],
      };
    });
  };
  let content;
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
    console.log('projectsState', projectsState),
    (
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
        />
        {content}
      </main>
    )
  );
}

export default App;
