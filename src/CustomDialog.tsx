import React, { useState } from "react";
import { Slide, Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogProps } from "./types";


const Transition = React.forwardRef<any, TransitionProps>((props: any, ref) => <Slide direction="left" ref={ref} {...props} />);


export default function CustomDialog(props: DialogProps) {
    const { onClose, selectedValue, open, onOk } = props;
    console.log(open, selectedValue);
    const isInput = selectedValue && selectedValue.isInput;
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const [formState, setFormState] = useState({
      title: '',
      desc: ''
    });
  
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={!isInput}
      >
        <DialogTitle>{isInput ? 'Enter meeting details' : 'Meeting details'}</DialogTitle>
        <DialogContent>
          {isInput ? <div className="Input-div">
            <input type="text" placeholder="Enter Title" required
              value={formState.title ? formState.title : ''}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
            <input type="text" placeholder="Enter Desc" required
              value={formState.desc ? formState.desc : ''}
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
                return <div>{result}</div>
              })}
            </div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {isInput ? 'Cancel' : 'Ok'}
          </Button>
          {isInput && onOk && <Button onClick={() => {
            onOk({ start: selectedValue.start, end: selectedValue.end, title: formState.title, desc: formState.desc })
            setFormState({ desc: '', title: '' })
            handleClose();
          }} color="primary">
            Ok
            </Button>}
        </DialogActions>
      </Dialog>
    );
  }
  