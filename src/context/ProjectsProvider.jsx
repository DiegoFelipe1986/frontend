import {useState, useEffect, createContext} from 'react';
import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);

    return(
        <ProjectsContext.Provider
            value={{
                projects
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