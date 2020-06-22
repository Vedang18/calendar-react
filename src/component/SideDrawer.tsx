import React from 'react';
import '../App.css';
import { Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SideDrawerStyles } from '../utils/styles';


export default function SideDrawer(props: any) {
    const { filters, setFilters } = props;
    const { showOtherCalendar, setShowOtherCalendar } = props;
    const { open, setOpen } = props;
    const classes = SideDrawerStyles();

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
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
                    labelPlacement="top" />

                <FormControlLabel
                    control={<Switch
                        checked={filters.fullDay}
                        onChange={handleSwitch}
                        color="primary"
                    />}
                    label="Show 24 Hr Calendar"
                    labelPlacement="top"
                />

                <FormControlLabel
                    control={<Switch
                        checked={showOtherCalendar}
                        onChange={() => setShowOtherCalendar(!showOtherCalendar)}
                    />}
                    label="Show Other Calendar"
                    labelPlacement="top"
                />
            </Drawer>
        </div>
    );
}
