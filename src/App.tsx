import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import SideDrawer from './component/SideDrawer';
import { IFilter } from './utils/types';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SideDrawerStyles } from './utils/styles';

const initialState: IFilter = {
  selectedTime: 0,
  fullDay: true
}
function App() {
  const [filters, setFilters] = useState<IFilter>(initialState);
  const [showOtherCalendar, setShowOtherCalendar] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const classes = SideDrawerStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  return (
    <div className="App">
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="Banner">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Calendar
          </Typography>
        </Toolbar>
      </AppBar>

      <SideDrawer filters={filters} setFilters={setFilters}
        showOtherCalendar={showOtherCalendar}
        setShowOtherCalendar={setShowOtherCalendar}
        open={open} setOpen={setOpen}/>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Calendar filters={filters} />

        {showOtherCalendar && <Calendar filters={initialState} />}
      </main>
    </div>
    </div>
  );
}

export default App;
