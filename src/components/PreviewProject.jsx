import {Link} from 'react-router-dom';
const PreviewProject = ({ project }) => {
    const { name, _id, client } = project;
    return (
        <div className='border-b p-5 flex'>
            <p className='flex-1'>
                {name}
                <span className='text-gray-400 text-sm uppercase'>
                    {' '}{client}
                </span>
            </p>
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