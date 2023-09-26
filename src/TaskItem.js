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
    setSelectedStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  // Calculate the CSS class based on the selected status
  const getStatusClass = () => {
    switch (selectedStatus) {
      case 'Not started':
        return 'not-started-bg';
      case 'In progress':
        return 'in-progress-bg';
      case 'Completed':
        return 'completed-bg';
      default:
        return '';
    }
  };

  const statusClass = getStatusClass();
  const textDecorationStyle =
    selectedStatus === 'Completed' ? 'line-through' : 'none';

  return (
    <li className={`list-item ${statusClass}`}>
      <div className='task-content'>
        <div>
          <span>👉🏼 </span>
          <span style={{ textDecoration: textDecorationStyle }}>
            {task.name}
          </span>
        </div>
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
