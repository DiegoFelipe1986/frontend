import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/projects', config);
                setProjects(data);

            } catch (error) {
                console.log(error)
            }
        }
        getProjects();
    }, []);

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({})
        }, 5000);
    }

    const submitProject = async project => {
        if (project.id) {
            await editProject(project)
        } else {
            await newProject(project)
        }

    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config);

            const updatedProjects = projects.map(projectState => projectState._id === data._id ? data : projectState);

            setProjects(updatedProjects);

            setAlert({
                msg: 'Project updated succesfuly',
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects', project, config);
            // To sync request with DB
            // setProjects([...project, data]);

            setAlert({
                msg: 'Project created succesfuly',
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async id => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/projects/${id}`, config);
            setProject(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/projects/${id}`, config);

            const updatedProjects = projects.filter(projectState => projectState._id !== id);

            setProjects(updatedProjects);

            setAlert({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask);

    }

    const submitTask = async task => {

        if (task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }


    }

    const createTask = async task => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/tasks', task, config);
            const updatedProject = { ...project }
            updatedProject.tasks = [...project.tasks, data];

            setProject(updatedProject);
            setAlert({});
            setModalFormTask(false);

        } catch (error) {
            console.log(error);
        }
    }

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axiosClient.put(`/tasks/${task.id}`, task, config);

            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === data._id ? data : taskState );

            setProject(updatedProject);
            setAlert({});
            setModalFormTask(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEdit = task => {
        setTask(task);
        setModalFormTask(true);
    }

    const handleModalDeleteTask = task => {
        setTask(task);
        setModalDeleteTask(!modalDeleteTask);
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axiosClient.delete(`/tasks/${task._id}`, config);
            setAlert({
                msg: data.msg,
                error: false
            });

            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.filter(taskState =>
            taskState._id !== task._id)

            setProject(updatedProject);
            setModalDeleteTask(false);
            setTask({});
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project,
                loading,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask,
                handleModalEdit,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                deleteTask
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
};

export {
    ProjectsProvider
}

export default ProjectsContext;