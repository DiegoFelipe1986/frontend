import { useEffect } from 'react';
import FormCollaborator from './FormCollaborator';
import useProjects from '../hooks/useProjects';
import {useParams} from 'react-router-dom';
import Alert from '../components/Alert';

const NewCollaborator = () => {

    const {getProject, project, loading, collaborator, addCollaborator, alert} = useProjects();
    const params = useParams();

    useEffect(() => {
        getProject(params.id);
    }, []);

    if (!project?._id) return <Alert alert={alert} />;

    return (
        <>
            <h1 className="text-4xl font-black">Add Collaborator to project: {project.name}</h1>

            <div className="mt-10 flex justify-center">
                <FormCollaborator />
            </div>

            {loading ? <p className='text-center'>Loading...</p> : collaborator?._id && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-white py-10 px-5 md:w-1/2 rounded-md shadow'>
                        <h2 className='text-center mb-10 text-2xl font-bold'>
                            Result
                        </h2>
                        <div className='flex justify-between items-center'>
                            <p>{collaborator.name}</p>
                            <button
                                type="button"
                                className='bg-slate-500 px-5 py-2 rounded-md
                                uppercase text-white font-bold text-sm'
                                onClick={() => addCollaborator({
                                    email: collaborator.email
                                })}
                            >
                                add to project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewCollaborator