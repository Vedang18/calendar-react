import React, { useState } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Info } from '@material-ui/icons';
import { Slide, Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from "@material-ui/core";

import { TransitionProps } from '@material-ui/core/transitions';
//import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";


/* 
TODO: 1. 60% width & height -> done
      2. 2 Calendar on same page -> Check
      3. Edit event 
      4. Filter events
      5. Changing theme
      6. Custom colors by adding css Classes
      7. Work hours or full day
*/

const localizer: DateLocalizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

const dstate = {
  events: [
    {
      start: moment().toDate(),
      end: moment().add(15, "minute").toDate(),
      title: "Some title",
      desc: "d0",
    },
    {
      start: moment().toDate(),
      end: moment().add(1, "hour").toDate(),
      title: "Some title1",
      desc: "d1",
    },
    {
      start: moment().toDate(),
      end: moment().add(2, "hour").toDate(),
      title: "Some title2",
      desc: "d2",
    },
    {
      start: moment().toDate(),
      end: moment().add(90, "minute").toDate(),
      title: "Some title3",
      desc: "d3",
    },
    {
      start: moment().toDate(),
      end: moment().add(12, "minute").toDate(),
      title: "Some title4",
      desc: "d4",
    },
  ],
};

const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);


function CalendarPage() {
  const [state, setState] = useState(dstate);

  const handleSelect = ({ start, end, action }: any) => {
    console.log(action);
    if (action !== 'click') {
      handleClickOpen({ start, end, isInput: true });
    }
  }

  const handleOk = ({ start, end, title, desc }: any) => {
    setState({
      ...state,
      events: [
        ...state.events,
        {
          start,
          end,
          title,
          desc
        },
      ]
    })
  }

  const handleClickOpen = (value: any) => {
    setSelectedValue(value);
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const formats: Object = {
    eventTimeRangeFormat: () => ""
  };


  return (
    <div className="App">
      <Calendar
        defaultDate={moment().toDate()}
        defaultView="week"
        events={state.events}
        localizer={localizer}
        timeslots={1}
        selectable
        popup
        dayLayoutAlgorithm='no-overlap'
        popupOffset={10}
        className='Calendar-main'
        onSelectEvent={event => handleClickOpen(event)}
        onSelectSlot={handleSelect}
        step={15}
        formats={formats}
        components={{
          week: {
            event: Event
          }
        }}
        scrollToTime={moment().toDate()}
      />
      <CustomDialog selectedValue={selectedValue} open={open} onClose={handleClose} onOk={handleOk} />
    </div>
  );
}

export interface DialogProps {
  open: boolean;
  selectedValue: any;
  onClose: (value: string) => void;
  onOk?: (val: any) => void;
}

function CustomDialog(props: DialogProps) {
  const { onClose, selectedValue, open, onOk } = props;
  console.log(open, selectedValue);
  const isInput = selectedValue && selectedValue.isInput;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const [formState, setFormState] = useState();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      disableBackdropClick={!isInput}
    >
      <DialogTitle>{isInput ? 'Enter meeting details' : 'Meeting details'}</DialogTitle>
      <DialogContent>
        {isInput ? <div className="Input-div">
          <input type="text" placeholder="Enter Title" required onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
          <input type="text" placeholder="Enter Desc" required onChange={(e) => setFormState({ ...formState, desc: e.target.value })} />
        </div> :
          <div className="Input-div">
            {selectedValue && Object.keys(selectedValue).map((e, i) => {
              let result = e + " : " + selectedValue[e] + "\n";
              return <div>{result}</div>
            })
            }
          </div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {isInput ? 'Cancel' : 'Ok'}
        </Button>
        {isInput && onOk && <Button onClick={() => {
          onOk({ start: selectedValue.start, end: selectedValue.end, title: formState.title, desc: formState.desc })
          handleClose();
        }} color="primary">
          Ok
          </Button>}
      </DialogActions>
    </Dialog>
  );
}

function Event({ event }: any) {
  return (
    <span>
      <Info color="secondary" />
      <strong style={{ margin: '0 0 0 5px', color: 'yellow' }}>{event.title}</strong>
    </span>
  )
}


export default CalendarPage;
