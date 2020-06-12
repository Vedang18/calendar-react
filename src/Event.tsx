import React from "react";
import { Info } from '@material-ui/icons';

export default function Event({ event }: any) {
    return (
      <span>
        <Info color="secondary" />
        <strong style={{ margin: '0 0 0 5px', color: 'yellow' }}>{event.title}</strong>
      </span>
    )
  }