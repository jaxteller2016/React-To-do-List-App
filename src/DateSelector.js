import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateSelector({ selectedDate, setSelectedDate }) {
  // Handler function to update the selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <p>Select a Date 👇🏼</p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='dd/MM/yyyy'
        className='picker'
      />
      {selectedDate && (
        <p style={{ paddingTop: '15px' }}>
          Selected Date:
          <br />
          <br />
          {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
}

export default DateSelector;
