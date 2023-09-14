import { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

export default function TaskItem({
  task,
  onUpdateStatus,
  onDeleteTask,
  onEditTask
}) {
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    console.log(newStatus);
    setSelectedStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  return (
    <li className='list-item'>
      <div className='task-content'>
        <span>👉🏼 {task.name}</span>
        <div>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className='status'
          >
            <option value='Not started'>Not started</option>
            <option value='In progress'>In progress</option>
            <option value='Completed'>Completed</option>
          </select>
          <button onClick={() => onEditTask(task)} className='edit-button'>
            <FaPencilAlt className='edit-icon' /> {/* Edit icon */}
          </button>
          <button onClick={handleDeleteTask} className='delete-button'>
            <FaTrash className='trash-icon' />
          </button>
        </div>
      </div>
    </li>
  );
}
