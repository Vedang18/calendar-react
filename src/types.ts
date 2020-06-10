import {Event} from 'react-big-calendar'
export interface IFilter {
    selectedTime: number;
    fullDay: boolean;
}

export interface CalenderPageProps {
    filters: IFilter
}

export interface DialogProps {
    open: boolean;
    selectedValue: any;
    onClose: (value: string) => void;
    onOk?: (val: any) => void;
}
export interface EventProps extends Event {
    isInput: boolean
}