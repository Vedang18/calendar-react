import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import _ from 'lodash'
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "react-big-calendar/lib/sass/styles.scss";

import { CalenderPageProps, EventProps } from "./utils/types";
import CustomDialog from './CustomDialog';
import CalendarEvent from './component/CalendarEvent';
import CalendarMonthEvent from './component/CalendarMonthEvent';
import EventList from './component/EventListDialog';

const defualtEvents:any[] = [
  { id: 1, title: 'Demo from client', start: moment(new Date()).add(30, "minute").toDate(), duration: 45, type: 1, desc: "Event 1 desc", customer: "a1@b.co.in", participant: "No@1oo.mz" },
  { id: 2, title: 'Customer visit', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 2, desc: "Event 2 desc", customer: "a2@b.co.in", participant: "No@2oo.mz" },
  { id: 3, title: 'Customer meeting', start: moment(new Date()).add(220, "minute").toDate(), duration: 60, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 4, title: 'Participant details', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 5, title: 'Revisit for all', start: moment(new Date()).add(50, "minute").toDate(), duration: 45, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 6, title: 'Test', start: moment(new Date()).add(10, "minute").toDate(), duration: 30, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 7, title: 'Trial', start: moment(new Date()).add(540, "minute").toDate(), duration: 45, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 8, title: 'Paticipant overview', start: moment(new Date()).add(430, "minute").toDate(), duration: 60, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 9, title: 'Review meeting', start: moment(new Date()).add(530, "minute").toDate(), duration: 30, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 10, title: 'Checking', start: moment(new Date()).add(130, "minute").toDate(), duration: 45, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
  { id: 11, title: 'Initial meeting with all', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
];

let events = _.chain(defualtEvents)
            .groupBy(function(obj) { return Math.floor(+(obj.start)/(1000*60*15)); })
            .sortBy(function(v, k) { return k; })
            .map(o=>{return {events: o,start:o[0].start,end:moment(o[0].start).add(15, "minute").toDate(), title:''}})
            .value();

console.log(events);

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
    alert('Implement Input InProgress '+state.view);
   
    // console.log(action);
    // if (action !== 'click') {
    //   handleClickOpen({ start, end, isInput: true });
    // }
  }


  const handleOk = ({ id, start, end, title, desc }: any) => {
    if (id) {
      let editEvent = state.events.find(s => s.id === id);
      if (editEvent) editEvent.desc = desc;
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
        borderRight: '1px solid #abc',
        borderBottom: '1px solid #cba',
      }
      if (date.getDate() % 2 === 0)
        return {
          //className: 'special-day',
          style: {
            background: 'rgba(100, 255, 240, 0.3)',
            ...border,
          },
        }
      else return {
        //className: 'special-day',
        style: {
          //background: 'rgba(110, 220, 135, 0.7)',
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

  return (
    <div className="Calendar">
      <Calendar
        defaultDate={moment().toDate()}
        views={['month', 'week', 'day', 'work_week']} //, 'agenda'
        defaultView="week"
        events={events}
        onView={(v) => setState({ ...state, view: v })}
        localizer={localizer}
        timeslots={1}
        step={15}
        dayPropGetter={customDayPropGetter}
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
            event: CalendarEvent
          },
          day:{
            event: CalendarEvent
          },
          month:{
            event: CalendarMonthEvent
          }
        }}
        scrollToTime={endTime}
      />
      {/* {open && <CustomDialog selectedValue={selectedValue} open={open} onClose={handleClose} onOk={handleOk} />} */}
      {open && <EventList events={selectedValue.events} handleClose={handleClose} open={open} />}
    </div>
  );
}

export default CalendarPage;
