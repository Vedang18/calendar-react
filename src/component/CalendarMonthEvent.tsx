import React from "react";
import { EventProps } from "../utils/types";

export default function Event({ event }: any) {
  const firstEvent:EventProps = event.events[0];
  return (
    <span>
      {firstEvent.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} | {event.events.length === 1 ? firstEvent.title : <><b>{event.events.length}</b> bookings in this slot</>}
    </span>
  )
}