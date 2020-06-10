import React, { useState } from 'react';
import './App.css';
import Calendar from './calendar';
import { InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import { IFilter } from './types';


const initialState: IFilter = {
  selectedTime: 0,
  fullDay: false
}
function App() {
  const [filters, setFilters] = useState(initialState);

  const handleDropdown = (evt: React.ChangeEvent<{ value: any }>) => {
    setFilters({
      ...filters,
      selectedTime: evt.target.value
    });

  }
  const handleSwitch = (evt: any) => {
    setFilters({
      ...filters,
      fullDay: evt.target.checked
    });
  }

  return (
    <div className="App">
      <header className="Banner">Calendar</header>
      <div>
        <div className="Left">
          <InputLabel id="select-label">Meeting Duration </InputLabel>
          <Select
            labelId="select-label"
            value={filters.selectedTime}
            fullWidth
            variant="outlined"
            onChange={handleDropdown}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={15}>15 Minutes</MenuItem>
            <MenuItem value={30}>30 Minutes</MenuItem>
            <MenuItem value={45}>45 Minutes</MenuItem>
            <MenuItem value={60}>1 Hour</MenuItem>
          </Select>
          <FormControlLabel
            control={<Switch
              checked={filters.fullDay}
              onChange={handleSwitch}
            />}
            label="Show 24 Hr Calendar"
            labelPlacement="start"
          />


        </div>
        <Calendar filters={filters} />
      </div>
      {/* <Calendar /> */}
    </div>
  );
}

export default App;
