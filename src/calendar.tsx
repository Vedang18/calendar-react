import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Info } from '@material-ui/icons';
import { Slide, Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@material-ui/core";

import { TransitionProps } from '@material-ui/core/transitions';
//import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "react-big-calendar/lib/sass/styles.scss";

import { CalenderPageProps, DialogProps } from "./types";

const defualtEvents = [
  {
    start: moment().toDate(),
    end: moment().add(15, "minute").toDate(),
    duration: 15,
    title: "Demo",
    desc: "calendar demo",
  },
  {
    start: moment().toDate(),
    end: moment().add(30, "minute").toDate(),
    duration: 30,
    title: "Meeting for calendar",
    desc: "Status track",
  },
  {
    start: moment().utc().toDate(),
    end: moment().utc().add(60, "minute").toDate(),
    duration: 60,
    title: "Review",
    desc: "Review code",
  },
  {
    start: moment().toDate(),
    end: moment().add(45, "minute").toDate(),
    duration: 45,
    title: "Client meeting",
    desc: "Meeting for updates with client",
  },
]
/* 
TODO: 1. 60% width & height -> Done
      2. 2 Calendar on same page -> Done (One below another)
      3. Edit event
      4. Filter events -> Done
      5. Changing theme
      6. Custom colors by adding css Classes
      7. Work week, Work hours or full day -> Done
      8. Horizontal time slots
*/

moment.locale('en-hi');
const localizer: DateLocalizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

const dstate = {
  events: defualtEvents,
};

const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);

const startTime: Date = moment().toDate();
startTime.setHours(9);
startTime.setMinutes(30);

const endTime: Date = moment().toDate();
endTime.setHours(19);
endTime.setMinutes(59);


function CalendarPage(props: CalenderPageProps) {
  const [state, setState] = useState(dstate);
  const { filters } = props;

  useEffect(() => {
    if (filters.selectedTime !== 0) {
      setState({
        ...state,
        events: defualtEvents.filter(e => e.duration === filters.selectedTime)
      });
    } else {
      setState({
        ...state,
        events: defualtEvents
      });
    }
  }, [filters.selectedTime]);

  const handleSelect = ({ start, end, action }: any) => {
    console.log(action);
    if (action !== 'click') {
      handleClickOpen({ start, end, isInput: true });
    }
  }


  const handleOk = ({ start, end, title, desc }: any) => {
    let newEvent = {
      start,
      end,
      duration: 15,
      title,
      desc
    }
    // setState({
    //   ...state,
    //   events: [
    //     ...state.events,
    //     newEvent,
    //   ]
    // })
    defualtEvents.push(newEvent);
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
    <div className="Calendar">
      <Calendar
        defaultDate={moment().toDate()}
        views={['month', 'week', 'day', 'work_week', 'agenda']}
        defaultView="week"
        events={state.events}
        localizer={localizer}
        timeslots={1}
        step={15}
        selectable
        popup
        dayLayoutAlgorithm='no-overlap'
        popupOffset={10}
        className='Calendar-main'
        onSelectEvent={event => handleClickOpen(event)}
        onSelectSlot={handleSelect}
        min={filters.fullDay ? undefined : startTime}
        max={filters.fullDay ? undefined : endTime}
        formats={formats}
        components={{
          week: {
            event: Event
          }
        }}
        scrollToTime={startTime}
      />
      <CustomDialog selectedValue={selectedValue} open={open} onClose={handleClose} onOk={handleOk} />
    </div>
  );
}

function CustomDialog(props: DialogProps) {
  const { onClose, selectedValue, open, onOk } = props;
  console.log(open, selectedValue);
  const isInput = selectedValue && selectedValue.isInput;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const [formState, setFormState] = useState({
    title: '',
    desc: ''
  });

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
          <input type="text" placeholder="Enter Title" required
            value={formState.title ? formState.title : ''}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
          <input type="text" placeholder="Enter Desc" required
            value={formState.desc ? formState.desc : ''}
            onChange={(e) => setFormState({ ...formState, desc: e.target.value })} />
        </div> :
          <div className="Input-div">
            {selectedValue && Object.keys(selectedValue).map((e, i) => {
              let result = e + " : " + selectedValue[e];
              if (selectedValue[e] instanceof Date) {
                result = e + " : " + selectedValue[e].toLocaleString(undefined, { hour12: true });
              } else if (e === 'duration') {
                result += " minutes";
              }
              //result += "\n";
              return <div>{result}</div>
            })}
          </div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {isInput ? 'Cancel' : 'Ok'}
        </Button>
        {isInput && onOk && <Button onClick={() => {
          onOk({ start: selectedValue.start, end: selectedValue.end, title: formState.title, desc: formState.desc })
          setFormState({ desc: '', title: '' })
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
