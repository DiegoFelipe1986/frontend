import ProjectForm from "../components/ProjectForm";

function NewProject() {
    return (
      <>
        <h1 className="text-4xl font-black pd-10">
          New Project
        </h1>

        <div className="mt-10 flex justify-center">
          <ProjectForm />
        </div>
      </>
    )
  }

  export default NewProject;