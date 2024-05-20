import React, { useState } from 'react';
import './App.css';
import { styled } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 250,
  marginTop: 100
}));



function App() {
  const [selectedDate, setSelectedDate] = useState(new Date('2017-05-24'));
  
  const handleChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const renderInput = (params) => {
    const date = new Date(params.inputProps.value);
    if (!isNaN(date)) {
      const year = date.getFullYear();
      const rocYear = year - 1911;
      const month = String(date.getMonth() + 1).padStart(2, '');
      const day = String(date.getDate()).padStart(2, '');
      params.inputProps.value = `民國${rocYear}-${month}月-${day}日`;
    }
    return <CustomTextField {...params} />;
  };

  return (
    <div className="App">
      <form noValidate>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="My first picker"
            value={selectedDate}
            onChange={handleChange}
            renderInput={renderInput}
          />
        </LocalizationProvider>
      </form>
    </div>
  );
}

export default App;