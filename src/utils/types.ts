import { Event } from 'react-big-calendar'
export interface IFilter {
    selectedTime: number;
    fullDay: boolean;
}

export interface CalenderPageProps {
    filters: IFilter
}

export interface EventProps {
    id:any;
    title: string;
    desc?: string;
    start: Date;
    duration: number;
    end?: Date;
    type: number;//May be enum
    participant?: string;
    customer?: string;
    otherDetails?: any;
}

export interface DialogProps {
    open: boolean;
    selectedValue: any;
    onClose: (value: string) => void;
    onOk: (val: any) => void;
}
export interface OldEventProps extends Event {
    isInput: boolean
}