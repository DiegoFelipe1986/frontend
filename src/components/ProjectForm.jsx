import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const ProjectForm = () => {

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deliverDate, setDeliverDate] = useState('');
    const [client, setClient] = useState('');

    const params = useParams();

    const {showAlert, alert, submitProject, project} = useProjects();

    useEffect(() => {
        if (params.id) {
            setId(project._id)
            setName(project.name);
            setDescription(project.description);
            setDeliverDate(project.deliverDate?.split('T')[0]);
            setClient(project.client);
        }
    }, [params]);

    const handleSubmit  = async e => {
        e.preventDefault();

        if ([name, description, deliverDate, client].includes('')) {
            showAlert({
                msg: 'All fields are required',
                error:true
            });
            return;
        }

        await submitProject({id, name, description, deliverDate, client});

        setId(null);
        setName('');
        setDescription('');
        setDeliverDate('');
        setClient('');
    }

    const {msg} = alert;

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
            onSubmit={handleSubmit}
        >
            {msg && <Alert alert={alert} />}
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="name">
                    Project name
                </label>
                <input
                    id="name"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="description">
                    Project description
                </label>
                <textarea
                    id="description"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="delivery-date">
                    Delivery date
                </label>
                <input
                    id="delivery-date"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={deliverDate}
                    onChange={e => setDeliverDate(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="client">
                    Client name
                </label>
                <input
                    id="client"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Client name"
                    value={client}
                    onChange={e => setClient(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value={ id ? 'Update project' : 'Create project' }
                className='bg-sky-600 w-full p-3 uppercase
                font-bold text-white rounded cursor-pointer
                hover:bg-sky-700 transition-colors'
            />
        </form>
    )
}

export default ProjectForm;