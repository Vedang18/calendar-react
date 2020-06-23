import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import _ from 'lodash'
//import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "react-big-calendar/lib/sass/styles.scss";

import { CalenderPageProps } from "./utils/types";
import CalendarEvent from './component/CalendarEvent';
import CalendarMonthEvent from './component/CalendarMonthEvent';
import EventList from './component/EventListDialog';
import BookingDialog from './component/BookingDialog';
import * as SampleInput from './utils/inputs'

const appointments = SampleInput.CustomerAppointments; 

function mapAppointment(eventArr: any[]) {
  console.log("refreshing", eventArr);
  return _.chain(eventArr)
    .groupBy(function (obj) { return Math.floor(+(obj.startTime) / (1000 * 60 * 15)); })
    .sortBy(function (v, k) { return k; })
    .map(o => { return { events: o, start: o[0].startTime, end: moment(o[0].startTime).add(15, "minute").toDate(), title: '' } })
    .value();
}

const mappedEvents = mapAppointment(appointments);
moment.locale('en-hi');
const localizer: DateLocalizer = momentLocalizer(moment);
//const DnDCalendar = withDragAndDrop(Calendar);

const dstate = {
  events: mappedEvents,
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
    setState({ ...state, events: mapAppointment(appointments) });
  }, [appointments.length]);

  const handleSlotSelect = ({ start, end, action }: any) => {
    console.log(action);
    if (action !== 'click') {
      setSelectedValue({ start, end, isInput: true });
      setBookingOpen(true);
    }
  }

  const handleCreate = (data: any) => {
    let ev = { ...data, id: appointments.length + 1 }
    appointments.push(ev);
  }

  const handleEventOpen = (value: any) => {
    setSelectedValue(value);
    setDetailsOpen(true);
  };

  const handleDeatilClose = (value: any) => {
    setDetailsOpen(false);
  };

  const handleBookingClose = (value: any) => {
    setBookingOpen(false);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
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
        events={state.events}
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
        onSelectEvent={event => handleEventOpen(event)}
        onSelectSlot={handleSlotSelect}
        min={filters.fullDay ? undefined : startTime}
        max={filters.fullDay ? undefined : endTime}
        formats={formats}
        components={{
          week: {
            event: CalendarEvent
          },
          day: {
            event: CalendarEvent
          },
          month: {
            event: CalendarMonthEvent
          }
        }}
        scrollToTime={startTime}
      />
      {bookingOpen && <BookingDialog selectedValue={selectedValue} open={bookingOpen}
        handleClose={handleBookingClose} onCreate={handleCreate} />}
      {detailsOpen && <EventList events={selectedValue.events} 
                      handleClose={handleDeatilClose} open={detailsOpen} />}
    </div>
  );
}

export default CalendarPage;
