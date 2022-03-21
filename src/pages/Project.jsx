import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import ModalFormTask from '../components/ModalFormTask';
import ModalDeleteTask from '../components/ModalDeleteTask';
import Task from '../components/Task'
import Alert from '../components/Alert';


const Project = () => {
    const params = useParams();

    const { getProject, project, loading, handleModalTask, alert } = useProjects();

    useEffect(() => {
        getProject(params.id);
    }, []);

    const { name } = project;

    const {msg} = alert;

    return (
        loading ? '...' : (
            <>
                <div className='flex justify-between'>
                    <h1 className='font-black text-4xl'>
                        {name}
                    </h1>
                    <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <Link
                            to={`/projects/edit/${params.id}`}
                            className="uppercase font-bold"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
                <button
                    onClick={handleModalTask}
                    type="button"
                    className='text-sm px-5 py-3 w-full md:w-auto rounded uppercase
                    font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center jestify-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    New task
                </button>
                <p className='font-bold text-xl mt-10'>Project tasks</p>

                <div className='flex justify-center'>
                    <div className='w-full md:w-1/3 lg:w-1/4'>
                        {msg && <Alert alert={alert} />}
                    </div>
                </div>

                <div className='bg-white shadow mt-10 rounded-md'>
                    {project.tasks?.length ?
                     project.tasks?.map(task => (
                         <Task
                            key={task._id}
                            task ={task}
                         />
                     ))
                     : <p className='text-center my-5 p-10'>No tasks for this project</p>}
                </div>
                <ModalFormTask
                />
                <ModalDeleteTask />
            </>
        )
    );

}

export default Project;