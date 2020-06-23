import React from "react";
import { Appointment } from "../utils/types";

export default function Event({ event }: any) {
  const firstEvent:Appointment = event.events[0];
  return (
    <span>
      {firstEvent.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} | {event.events.length === 1 ? firstEvent.customerName : <><b>{event.events.length}</b> bookings in this slot</>}
    </span>
  )
}