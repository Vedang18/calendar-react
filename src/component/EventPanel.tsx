import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import { ExpandMore, InfoOutlined, Videocam, Timelapse } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { EventProps } from '../utils/types';
import { ExpansionPanelStyles } from '../utils/styles';

interface EventPanelProps {
  event: EventProps;
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
      <ExpansionPanel expanded={props.expanded === true || props.expanded === 'panel' + event.id} onChange={props.handleChange('panel' + event.id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
        >

          <EventIcon type={event.type} />

          <Typography variant="h4" className={classes.heading}>{`${event.title} on ${event.start.toUTCString()} for 
          ${event.duration} mins`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography variant="caption">
              <b>Description:</b> {event.desc}
              <br />
              <b>Participant:</b> {event.participant}
              <br />
              <b>Customer:</b> {event.customer}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography variant="caption">
              <b>Other Details:</b> {event.otherDetails}
              <br />Sample Details<br /> In event
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button size="small" variant="contained" >Cancel</Button>
          <Button size="small" variant="contained" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}