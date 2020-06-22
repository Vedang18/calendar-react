import React, { useState } from "react";
import { Slide, Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogProps } from "./utils/types";
import EventPanel from './component/EventPanel';

const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);


export default function CustomDialog(props: DialogProps) {
    const { onClose, selectedValue, open, onOk } = props;
    console.log(selectedValue);
    const isInput = selectedValue && selectedValue.isInput;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const [formState, setFormState] = useState({
        title: selectedValue ? selectedValue.title : '',
        desc: selectedValue ? selectedValue.desc : '',
        isEdit: false
    });

    const performEdit = () => {
        if (!formState.isEdit) {
            setFormState({ ...formState, isEdit: true })
        } else {
            onOk({ id: selectedValue.id, start: selectedValue.start, end: selectedValue.end, title: formState.title, desc: formState.desc })
            setFormState({ isEdit: false, desc: '', title: '' });
            handleClose();

        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            disableBackdropClick={!isInput}
        >
            <DialogTitle>{isInput ? 'Enter meeting details' : 'Meeting details'}</DialogTitle>
            <DialogContent dividers>
                {isInput || formState.isEdit ? <div className="Input-div">
                    <input type="text" placeholder="Enter Title" disabled={formState.isEdit}
                        value={formState.title}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
                    <input type="text" placeholder="Enter Desc"
                        value={formState.desc}
                        onChange={(e) => setFormState({ ...formState, desc: e.target.value })} />
                </div> :
                    <div className="Input-div">
                        {selectedValue && Object.keys(selectedValue).map((e, i) => {
                            let result = e + " : " + selectedValue[e];
                            if (selectedValue[e] instanceof Date) {
                                result = e + " : " + selectedValue[e].toLocaleString(undefined, { hour12: true });
                            } else if (e === 'duration') {
                                result += " minutes";
                            }
                            //result += "\n";
                            return <div key={i}>{result}</div>
                        })}
                    </div>}
                   </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setFormState({ isEdit: false, desc: '', title: '' })
                    handleClose();
                }} color="primary">
                    {isInput ? 'Cancel' : 'Close'}
                </Button>
                {isInput && onOk && <Button onClick={() => {
                    onOk({ start: selectedValue.start, end: selectedValue.end, title: formState.title, desc: formState.desc })
                    setFormState({ ...formState, desc: '', title: '' })
                    handleClose();
                }} color="primary">
                    Ok
                </Button>}
                {!isInput &&
                    <Button onClick={performEdit} color="primary">
                        {formState.isEdit ? 'Done' : 'Edit'}
                    </Button>}

            </DialogActions>
        </Dialog>
    );
}
