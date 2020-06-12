import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import { Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import { IFilter } from './types';


const initialState: IFilter = {
  selectedTime: 0,
  fullDay: false
}
function App() {
  const [filters, setFilters] = useState<IFilter>(initialState);
  const [showOtherCalendar, setShowOtherCalendar] = useState<boolean>(false);

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
          <FormControlLabel
            control={<Select
            value={filters.selectedTime}
            fullWidth
            variant="outlined"
            onChange={handleDropdown}
            autoWidth={true}
            margin='dense'
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={15}>15 Minutes</MenuItem>
            <MenuItem value={30}>30 Minutes</MenuItem>
            <MenuItem value={45}>45 Minutes</MenuItem>
            <MenuItem value={60}>1 Hour</MenuItem>
          </Select>}
          label="Meeting Duration"
          labelPlacement="top"/>
  
          <FormControlLabel
            control={<Switch
              checked={filters.fullDay}
              onChange={handleSwitch}
              color="primary"
            />}
            label="Show 24 Hr Calendar"
            labelPlacement="start"
          />
      
          <FormControlLabel
            control={<Switch
              checked={showOtherCalendar}
              onChange={()=>setShowOtherCalendar(!showOtherCalendar)}
            />}
            label="Show Other Calendar"
            labelPlacement="top"
          />
        </div>
        <Calendar filters={filters} />
      </div>
      {showOtherCalendar && <Calendar filters={initialState} />}
    </div>
  );
}

export default App;
