import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProjects from '../hooks/useProjects';


const Header = () => {

    const {logOutProjects} = useProjects();
    const {logOut} = useAuth();

    const handleLogOut = () => {
        logOutProjects();
        logOut();
        localStorage.removeItem('token');
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

                <div className='flex items-center gap-4'>
                    <Link
                        to="/projects"
                        className='font-bold uppercase'
                    >
                        Projects
                    </Link>
                    <button
                        type='button'
                        className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                        onClick={handleLogOut}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;