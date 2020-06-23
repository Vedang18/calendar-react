import { Event } from 'react-big-calendar'

export enum AppointmentType {
    All = 0,
    Consultation = 1,
    VideoConsultation = 2,
    ReserveTime = 3
}

export enum AppointmentStatus {
        Scheduled = 1,
        Accepted = 2,
        Rejected = 3,
        Cancelled = 4,
        InProgress = 5,
        Completed = 6
}

export interface IFilter {
    selectedTime: number;
    fullDay: boolean;
}

export interface CalenderPageProps {
    filters: IFilter
}

export interface EventProps {
    id: any;
    title: string;
    desc?: string;
    start: Date;
    duration: number;
    end?: Date;
    type: number;//May be enum
    participant?: string;
    customer?: string;
    otherDetails?: any;
    slot?: any;
}

export interface Appointment {
    id?:string;
    type: AppointmentType;
    status: AppointmentStatus;
    startTime: Date;
    duration: number;
    customerName?: string;
    customerEmail: string;
    customerPhone?: string;
    message?: string;
    host: string;
    cancellationReason?: string;
    rejectionReason?: string;
}


export interface Appoinment {
    type: AppointmentType;
    participant: any;
    internalParticipant: any;
    responsiblePerson: any;
    selectDate: any;
    selectDuration: string;
    selectFromOpenSlots: string;
    comment: string;
    status: string;
    recurrence: string;
    occurrences: number;
}

export interface AppoinmentSave {
    type: AppointmentType;
    participant: any;
    internalParticipant: any;
    host: any;
    appointmentDuration: string;
    appointmentTime: string;
    description: string;
    status: string;
    frequency: any;
    repetitionCount: any;
}

// export interface Participant {
//     id: string;
//     name: string;
//     mobilePhone: any;
//     // phoneNumber: string;
//     dob: any = { date: { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }, jsdate: new Date() };
//     email: string;
//     gender: Enums.Gender;
//     age: any;
// }

export interface Reserve {
    type: AppointmentType;
    title: string;
    responsiblePerson: any;
    selectDate: any;
    selectDuration: string;
    selectFromOpenSlots: string;
    status: string;
    recurrence: string;
    occurrences: number;
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