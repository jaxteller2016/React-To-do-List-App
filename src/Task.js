import TaskItem from './TaskItem';

export default function Task({
  task,
  onUpdateStatus,
  onDeleteTask,
  onEditTask
}) {
  return (
    <div className='task-container'>
      {task && (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      )}
    </div>
  );
}
