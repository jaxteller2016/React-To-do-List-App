import './styles.css';
import { useState, useEffect } from 'react';
import DateSelector from './DateSelector';
import TaskFormModal from './TaskFormModal';
import { v4 as uuidv4 } from 'uuid';
import RenderTasks from './RenderTasks';
import Button from './Button';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalType, setModalType] = useState(null); // Use a single modal state
  const [tasksState, setTasksState] = useState({});
  const [editedTask, setEditedTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state

  const filteredTasks = tasksState[selectedDate?.toDateString()] || [];

  // Load tasks and selected date from local storage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedSelectedDate = localStorage.getItem('selectedDate');

    if (savedTasks) {
      setTasksState((prevTasks) => {
        const updatedTasks = JSON.parse(savedTasks);
        return { ...prevTasks, ...updatedTasks };
      });
    } else {
      setTasksState({}); // Initialize tasksState if no data is found
    }

    if (savedSelectedDate) {
      setSelectedDate(new Date(savedSelectedDate));
    } else {
      setSelectedDate(getCurrentDate()); // Initialize selectedDate with current date if no data is found
    }

    // Set loading to false once tasks and selected date are loaded
    setLoading(false);
  }, []);

  // Save tasks and selected date to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksState));
  }, [tasksState]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate.toISOString());
    }
  }, [selectedDate]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    setEditedTask(null);
  }, [selectedDate]);

  const isDateInFuture = (date) => {
    return date >= currentDate;
  };

  const isDateInThePast = (date) => {
    return date < currentDate;
  };

  const handleOpenModal = (modalType) => {
    setModalType(modalType);
    setEditedTask(null);
    setTaskName('');
  };

  const handleTaskNameChange = (newTaskName) => {
    setTaskName(newTaskName);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditedTask(null);
    setTaskName('');
  };

  const handleSubmitTask = (taskName) => {
    const taskId = uuidv4();
    const selectedDateString = selectedDate.toDateString();

    setTasksState((prevTasks) => {
      const updatedTasksState = { ...prevTasks };
      const tasksForDate = updatedTasksState[selectedDateString] || [];
      const newTask = { id: taskId, name: taskName, status: 'Not started' };
      const updatedTasksForDate = [...tasksForDate, newTask];
      updatedTasksState[selectedDateString] = updatedTasksForDate;
      return updatedTasksState;
    });

    handleCloseModal();
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasksState((prevTasks) => {
      const selectedDateString = selectedDate.toDateString();
      const updatedTasksState = { ...prevTasks };
      const tasksForDate = updatedTasksState[selectedDateString] || [];
      const updatedTasks = tasksForDate.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      updatedTasksState[selectedDateString] = updatedTasks;
      return updatedTasksState;
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasksState((prevTasks) => {
      const selectedDateString = selectedDate.toDateString();
      const updatedTasksState = { ...prevTasks };
      const tasksForDate = updatedTasksState[selectedDateString] || [];
      const updatedTasks = tasksForDate.filter((task) => task.id !== taskId);
      updatedTasksState[selectedDateString] = updatedTasks;
      return updatedTasksState;
    });
  };

  const handleEditTask = (task) => {
    setModalType('edit');
    setEditedTask(task);
    setTaskName(task.name);
  };

  const handleEditModalClose = () => {
    setModalType(null);
    setEditedTask(null);
    setTaskName('');
  };

  const handleEditTaskSubmit = (editedName) => {
    setTasksState((prevTasks) => {
      const updatedTasksState = { ...prevTasks };
      const selectedDateString = selectedDate.toDateString();
      const tasksForDate = updatedTasksState[selectedDateString] || [];
      const updatedTasks = tasksForDate.map((task) => {
        if (task.id === editedTask.id) {
          return { ...task, name: editedName };
        }
        return task;
      });
      updatedTasksState[selectedDateString] = updatedTasks;
      return updatedTasksState;
    });

    handleEditModalClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App-container'>
      <h1>Welcome to your To-Do List App</h1>
      <h3>Manage and add new tasks</h3>
      <div className='container'>
        <div className='date-container'>
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          {isDateInFuture(selectedDate) && (
            <div className='buttons'>
              <Button
                className='button-add'
                bgColor='#C8FFE0'
                textColor='#614BC3'
                onClick={() => handleOpenModal('add')}
              >
                Add New Task<span>＋</span>
              </Button>
            </div>
          )}
        </div>
        {selectedDate && isDateInThePast(selectedDate) ? (
          <RenderTasks
            selectedDate={selectedDate}
            filteredTasks={filteredTasks}
            handleUpdateStatus={handleUpdateStatus}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ) : (
          <RenderTasks
            selectedDate={selectedDate}
            filteredTasks={filteredTasks}
            handleUpdateStatus={handleUpdateStatus}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        )}
      </div>
      {modalType === 'edit' && (
        <TaskFormModal
          isOpen={true}
          onRequestClose={handleEditModalClose}
          onSubmit={handleEditTaskSubmit}
          task={editedTask}
          taskName={taskName}
          isEdit={true}
          onTaskNameChange={handleTaskNameChange}
        />
      )}
      {modalType === 'add' && (
        <TaskFormModal
          isOpen={true}
          onRequestClose={handleCloseModal}
          onSubmit={handleSubmitTask}
          taskName={taskName}
          onTaskNameChange={handleTaskNameChange}
        />
      )}
    </div>
  );
}
