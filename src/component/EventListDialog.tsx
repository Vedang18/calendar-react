import React from "react";
import { Slide, Dialog, DialogContent,DialogTitle } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { Appointment } from "../utils/types";
import EventPanel from '../component/EventPanel';

interface EventListProps {
    events: Appointment[];
    handleClose: any;
    open: boolean;
}

const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function EventList(props: EventListProps) {
    const { events, open, handleClose } = props;
    const [expanded, setExpanded] = React.useState<string | boolean>(events.length===1);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            fullScreen
            style={{maxWidth:"40vw",inset:'0 0 0 auto'}}
        >

        <DialogTitle>Appointments</DialogTitle>
            <DialogContent>
                {events.map((e, i) => {
                    return <EventPanel key={i} event={e} expanded={expanded} handleChange={handleChange}/>
                })}
            </DialogContent>
        </Dialog>
    )

}