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
  onTaskNameChange,
  onEmailChange,
  title,
  email
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
    if (onTaskNameChange) {
      // Call onTaskNameChange if it's provided
      onTaskNameChange(taskName);
      onSubmit(taskName);
      onTaskNameChange('');
    }
    if (onEmailChange && email) {
      // Call onEmailChange if it's provided and email is defined
      onSubmit();
    }

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
      <h2>{title}</h2> {/* Updated title */}
      <form onSubmit={handleSubmit}>
        <label>
          {onTaskNameChange ? 'Task Name' : 'Email Address'}:
          <input
            type='text'
            value={isEdit ? taskName : email}
            onChange={(e) => {
              if (onTaskNameChange && !email) {
                onTaskNameChange(e.target.value);
              } else if (onEmailChange && !taskName) {
                onEmailChange(e);
              }
            }}
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
