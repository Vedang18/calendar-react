import React from "react";

export default function Event({ event }: any) {
    return (
      <span>
         {event.events.length ===1? event.events[0].title : <><b>{event.events.length}</b> bookings in this slot</>}
      </span>
    )
  }