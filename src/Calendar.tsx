import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "react-big-calendar/lib/sass/styles.scss";

import { CalenderPageProps } from "./types";
import CustomDialog from './CustomDialog';
import Event from './Event';

const defualtEvents = [
  {
    id: 1,
    start: moment().toDate(),
    end: moment().add(15, "minute").toDate(),
    duration: 15,
    title: "Demo",
    desc: "calendar demo",
  },
  {
    id: 2,
    start: moment().toDate(),
    end: moment().add(30, "minute").toDate(),
    duration: 30,
    title: "Meeting for calendar",
    desc: "Status track",
  },
  {
    id: 3,
    start: moment().utc().toDate(),
    end: moment().utc().add(60, "minute").toDate(),
    duration: 60,
    title: "Review",
    desc: "Review code",
  },
  {
    id: 4,
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
      3. Filter events -> Done
      4. Changing theme -> Done
      5. Custom colors by adding css Classes -> Done
      6. Work week, Work hours or full day -> Done
      7. Horizontal time slots -> No Support
      8. Group of Events
      9. Edit event -> Done
*/

moment.locale('en-hi');
const localizer: DateLocalizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

const dstate = {
  events: defualtEvents,
  view: 'week'
};


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


  const handleOk = ({ id, start, end, title, desc }: any) => {
    if(id) {
      let editEvent = state.events.find(s => s.id ===id);
      if(editEvent) editEvent.desc = desc;
    } else {
    let newEvent = {
      id: defualtEvents.length + 1,
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

  const customDayPropGetter = (date: any) => {
    //Customizing only month
    if (state.view === 'month') {
      const border = {
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
      }
      if (date.getDate() % 2 === 0)
        return {
          //className: 'special-day',
          style: {
            background: 'rgba(130, 232, 218, 0.69)',
            ...border,
          },
        }
      else return {
        //className: 'special-day',
        style: {
          background: 'rgba(205, 174, 255, 0.55)',
          ...border,
        },
      }
    } else if (state.view === 'week' && date.toDateString() === new Date().toDateString()) {
      return {
        style: {
          background: '#fbe0e1',
        }
      }
    } else return {};
  }

  // const customSlotPropGetter = (date: any) => {
  //   if (date.getDate() === new Date().getDate())
  //     return {
  //       style: {
  //         background: 'magenta',
  //         border: '1px solid #adadad'
  //       },
  //     }
  //   else return {
  //     border: '1px solid #adadad'
  //   }
  // }

  return (
    <div className="Calendar">
      <Calendar
        defaultDate={moment().toDate()}
        views={['month', 'week', 'day', 'work_week', 'agenda']}
        defaultView="week"
        events={state.events}
        onView={(v) => setState({ ...state, view: v })}
        localizer={localizer}
        timeslots={1}
        step={15}
        dayPropGetter={customDayPropGetter}
        //slotPropGetter={customSlotPropGetter}
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
        scrollToTime={endTime}
      />
      {open && <CustomDialog selectedValue={selectedValue} open={open} onClose={handleClose} onOk={handleOk} />}
    </div>
  );
}





export default CalendarPage;
