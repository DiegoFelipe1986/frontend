import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PreviewProject = ({ project }) => {

    const { auth } = useAuth();


    const { name, _id, client } = project;
    return (
        <div className='border-b p-5 flex justify-between'>
            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {name}
                    <span className='text-gray-400 text-sm uppercase'>
                        {' '}{client}
                    </span>
                </p>
                {auth._id !== project.creator && (

                    <p className='p-1 text-xs rounded-lg text-white
                    bg-green-500 font-bold uppercase'>
                        Collaborator
                    </p>
                )}
            </div>
            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase
                text-sm font-bold"
            >
                View project
            </Link>
        </div>
    )
}

export default PreviewProject;