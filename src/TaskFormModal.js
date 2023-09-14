import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function TaskFormModal({
  isOpen,
  onRequestClose,
  onSubmit,
  task,
  isEdit,
  taskName,
  onTaskNameChange
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus on the input field when the modal is opened
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskName);
    onTaskNameChange('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEdit ? 'Edit Task Modal' : 'Add Task Modal'}
      className='TaskModal'
    >
      <button onClick={onRequestClose} className='close-button'>
        &times;
      </button>
      <h2>{isEdit ? 'Edit Task' : 'Add New Task'}</h2> {/* Updated title */}
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type='text'
            value={taskName}
            onChange={(e) => onTaskNameChange(e.target.value)}
            ref={inputRef}
            autoFocus
          />
        </label>
        <button type='submit'>{isEdit ? 'Save Changes' : 'Submit'}</button>
      </form>
    </Modal>
  );
}

export default TaskFormModal;
