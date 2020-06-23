import React, { useState } from 'react';

import {
    Slide, Dialog, DialogTitle, DialogContent, InputLabel,
    Select, MenuItem, Button, TextField, DialogActions, FormControl
} from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { Appointment } from '../utils/types';

const emails = [{ id: 0, email: 'create.default@mail.com' }, { id: 1, email: 'default.new@mail.com' },
{ id: 2, email: 'members.admin@mail.com' }, { id: 3, email: 'user.name@mail.com' }, { id: 4, email: 'first.last@mail.com' },];

const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);

const defaultState: Appointment = {
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    host: '',
    startTime: new Date(),
    duration: 0,
    //slot: undefined,
    id:undefined,
    type:1,
    status: 1,
};

export default function BookingDialog(props: any) {
    const { open, handleClose, onCreate } = props;
    const [formState, setFormState] = useState(defaultState);

    const createRecord = () => {
        onCreate(formState);
        closeDialog();

    }

    const closeDialog = () => {
        setFormState(defaultState);
        handleClose();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            //disableBackdropClick={true}
            style={{ minHeight: '80vh' }}
        >
            <DialogTitle>Create Appointment</DialogTitle>
            <DialogContent dividers style={{ display: 'grid', rowGap: '10px' }}>
                <TextField variant="outlined" size="small" fullWidth label="Customer Name"
                    value={formState.customerName}
                    onChange={(e) => setFormState({ ...formState, customerName: e.target.value })} />
                <TextField variant="outlined" size="small" fullWidth label="Customer Phone"
                    value={formState.customerPhone}
                    onChange={(e) => setFormState({ ...formState, customerPhone: e.target.value })} />

                <TextField variant="outlined" size="small" fullWidth label="Customer Email Address"
                    type='email' value={formState.customerEmail}
                    onChange={(e) => setFormState({ ...formState, customerEmail: e.target.value })} />

                <Select margin='dense' variant="outlined"
                    defaultValue={-1}
                    fullWidth
                    onChange={(e) => setFormState({ ...formState, host: e.target.value+'' })}
                >
                    <MenuItem value={-1}>Select host from list</MenuItem>
                    {emails.map(e => {
                        return <MenuItem value={e.id}>{e.email}</MenuItem>;
                    })}
                </Select>
                <div style={{ display: 'flex', columnGap: '20px', justifyContent: 'space-between' }}>
                    <TextField type="date"
                        label="Date"
                        defaultValue={new Date().toString()}
                        onChange={(e) => setFormState({ ...formState, startTime: new Date(e.target.value) })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl>
                        <InputLabel id="duration-label">Duration</InputLabel>
                        <Select autoWidth labelId="duration-label"
                            defaultValue={15}
                            onChange={(e) => setFormState({ ...formState, duration: (e.target.value as number) })}
                        >
                            <MenuItem value={15}>15 Minutes</MenuItem>
                            <MenuItem value={30}>30 Minutes</MenuItem>
                            <MenuItem value={45}>45 Minutes</MenuItem>
                            <MenuItem value={60}>1 Hour</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="slot-label">Slot</InputLabel>
                        <Select autoWidth labelId="slot-label"
                            defaultValue={15}
                           // onChange={(e) => setFormState({ ...formState, slot: e.target.value })}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={15}>15 Minutes</MenuItem>
                            <MenuItem value={30}>30 Minutes</MenuItem>
                            <MenuItem value={45}>45 Minutes</MenuItem>
                            <MenuItem value={60}>1 Hour</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeDialog} size="small" color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button size="small" variant="contained" color="primary" onClick={createRecord}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )

}