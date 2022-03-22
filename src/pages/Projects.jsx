import PreviewProject from "../components/PreviewProject";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";

function Projects() {

  const {projects} = useProjects();

  const {msg} = alert;

  return (
    <>
      <h1 className="text-4xl font-black pd-10">
        Projects
      </h1>
      {msg && <Alert alert={alert} />}
      <div className="bg-white shadow mt-10 rounded-md">
        {projects.length ?
          projects.map(project => (
            <PreviewProject
              key={project._id}
              project={project}
            />
          ))

          : <p className="text-center text-gray-600 uppercase p-5">No projects</p>}

      </div>
    </>
  )
}

export default Projects;