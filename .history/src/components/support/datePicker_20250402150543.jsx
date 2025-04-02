import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateOfBirthInput = ({dateofbirth}) => {
  
  const [selectedDate, setSelectedDate] = useState(null);


  return (
    <div>
      <label htmlFor="dob">Date of Birth:</label>
      <DatePicker
        id="dob"
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Select your date of birth"
        maxDate={new Date()} // Prevent selecting future dates
      />
    </div>
  );
};

export default DateOfBirthInput;