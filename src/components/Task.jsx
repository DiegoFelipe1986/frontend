import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {

  const {handleModalEdit, handleModalDeleteTask} = useProjects();

  const { description, name, priority, dateDelivery, state, _id } = task;
  console.log(task);
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <h2 className="mb-1 text-xl text-bold">{name}</h2>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-indigo-600">State: {priority}</p>
        <p className="mb-1 text-sm">{formatDate(dateDelivery)}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase
          font-bold text-sm rounded-md"
          onClick={() => handleModalEdit(task)}
        >
          Edit
        </button>
        {state ? (
          <button
            className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-md"
          >
            Complete
          </button>
        ) :
          <button
            className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-md"
          >
            Incomplete
          </button>
        }

        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-md"
          onClick={ () => handleModalDeleteTask(task)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Task;