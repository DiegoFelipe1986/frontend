import useProjects from "../hooks/useProjects";

function Projects() {

  const {projects} = useProjects();

  return (
    <>
      <h1 className="text-4xl font-black pd-10">
        Projects
      </h1>

      <div>

      </div>
    </>
  )
}

export default Projects;