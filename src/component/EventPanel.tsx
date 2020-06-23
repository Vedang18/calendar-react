import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import { ExpandMore, InfoOutlined, Videocam, Timelapse } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Appointment, AppointmentStatus, AppointmentType } from '../utils/types';
import { ExpansionPanelStyles } from '../utils/styles';

interface EventPanelProps {
  event: Appointment;
  expanded?: any;
  handleChange?: any;
}

const EventIcon = ({ type }: any) => {
  switch (type) {
    case 1:
      return <Timelapse color="primary" />
    case 2:
      return <Videocam color="primary" />
    case 3:
    default:
      return <InfoOutlined color="primary" />
  }
}

export default function EventPanel(props: EventPanelProps) {
  const classes = ExpansionPanelStyles();

  const { event } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={props.expanded === true || props.expanded === 'panel' + event.id}
        onChange={props.handleChange('panel' + event.id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
        >
          <EventIcon type={event.type} />

          {/* <Typography variant="h4" className={classes.heading}>{`${event.title} on ${event.start.toUTCString()} for 
          ${event.duration} mins`}</Typography> */}
          <Typography variant="h4" className={classes.heading}>{event.customerName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography variant="subtitle2" gutterBottom>
            <div style={{ display: 'grid', gridTemplateColumns: '40% 3% auto', gridGap: '3px' }}>
              {/* <div><b>Description</b></div>: <div>{event.desc}</div>
              <div><b>Participant</b></div>: <div>{event.participant}</div>
              <div><b>Customer</b></div>: <div>{event.customer}</div>
              <div><hr/></div><div><hr/></div><div><hr/></div> */}
              <div><b>Type</b></div>: <div>{AppointmentType[event.type]}</div>
              <div><b>Status</b></div>: <div>{AppointmentStatus[event.status]}</div>
              <div><b>Appointment Time</b></div>: <div>{event.startTime.toLocaleTimeString()}</div>
              <div><b>Duration</b></div>: <div>{event.duration} mins</div>
              <div><b>Customer Email</b></div>: <div>{event.customerEmail}</div>
              <div><b>Customer Phone</b></div>: <div>{event.customerPhone}</div>
              <div><b>Host</b></div>: <div>{event.host}</div>
              <div><b>Cancellation Reason</b></div>: <div>{event.cancellationReason}</div>
              <div><b>Rejection Reason</b></div>: <div>{event.rejectionReason}</div>
            </div>
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions style={{display:'flex', justifyContent:'flex-start'}}>
          <Button size="small" variant="contained" color="primary">Join</Button>
          <Button size="small" variant="contained" color="secondary">
            Cancel
          </Button>
          <Button size="small" variant="outlined" color="primary">
            Notify
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}