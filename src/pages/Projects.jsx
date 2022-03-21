import PreviewProject from "../components/PreviewProject";
import useProjects from "../hooks/useProjects";

function Projects() {

  const {projects} = useProjects();

  return (
    <>
      <h1 className="text-4xl font-black pd-10">
        Projects
      </h1>

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