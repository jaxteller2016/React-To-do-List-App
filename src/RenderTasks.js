import React from 'react';
import Task from './Task';

const RenderTasks = ({
  selectedDate,
  filteredTasks,
  handleUpdateStatus,
  handleDeleteTask,
  handleEditTask
}) => {
  return (
    <div className='list-container'>
      <h2>Your Tasks for {selectedDate?.toDateString()}:</h2>
      <div
        className={`task-list-container ${
          filteredTasks.length > 0 ? 'with-tasks' : ''
        }`}
      >
        <ul className='list'>
          {filteredTasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              onUpdateStatus={(newStatus) =>
                handleUpdateStatus(task.id, newStatus)
              }
              onDeleteTask={(taskId) => handleDeleteTask(taskId)}
              onEditTask={handleEditTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RenderTasks;
