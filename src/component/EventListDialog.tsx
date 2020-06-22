import React from "react";
import { Slide, Dialog, DialogContent } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { EventProps } from "../utils/types";
import EventPanel from '../component/EventPanel';

interface EventListProps {
    events: EventProps[];
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
            fullWidth
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            //disableBackdropClick={true}
            style={{ minHeight: '40vh'}}
        >
            <DialogContent>
                {events.map((e, i) => {
                    return <EventPanel key={i} event={e} expanded={expanded} handleChange={handleChange}/>
                })}
            </DialogContent>
        </Dialog>
    )

}