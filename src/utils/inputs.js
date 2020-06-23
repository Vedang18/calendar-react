import moment from 'moment';

export const GenericEvent = [
    { id: 1, title: 'Demo from client', start: moment(new Date()).add(30, "minute").toDate(), duration: 45, type: 1, desc: "Event 1 desc", customer: "a1@b.co.in", participant: "No@1oo.mz" },
    { id: 2, title: 'Customer visit', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 2, desc: "Event 2 desc", customer: "a2@b.co.in", participant: "No@2oo.mz" },
    { id: 3, title: 'Customer meeting', start: moment(new Date()).add(220, "minute").toDate(), duration: 60, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 4, title: 'Participant details', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 5, title: 'Revisit for all', start: moment(new Date()).add(50, "minute").toDate(), duration: 45, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 6, title: 'Test', start: moment(new Date()).add(10, "minute").toDate(), duration: 30, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 7, title: 'Trial', start: moment(new Date()).add(540, "minute").toDate(), duration: 45, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 8, title: 'Paticipant overview', start: moment(new Date()).add(430, "minute").toDate(), duration: 60, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 9, title: 'Review meeting', start: moment(new Date()).add(530, "minute").toDate(), duration: 30, type: 3, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 10, title: 'Checking', start: moment(new Date()).add(130, "minute").toDate(), duration: 45, type: 1, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
    { id: 11, title: 'Initial meeting with all', start: moment(new Date()).add(130, "minute").toDate(), duration: 15, type: 2, desc: "Event 3 desc", customer: "a3@b.co.in", participant: "No3@oo.mz" },
];

export const CustomerAppointments = [
    {
        id: 1,
        type: 1,
        status: 1,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'tony@stark.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Tony Stark'
    },
    {
        id: 2,
        type: 2,
        status: 2,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'Captain@Ameria.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Steave Roggers'
    },
    {
        id: 3,
        type: 3,
        status: 3,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'bruce.banner@hulk.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Bruce Banner'
    },
    {
        id: 4,
        type: 1,
        status: 4,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'black@widow.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Natasha Romanoff'
    },
    {
        id: 5,
        type: 2,
        status: 5,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'lord@thor.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Thor Thundergod'
    },
    {
        id: 6,
        type: 3,
        status: 6,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'cool@deadpool.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Wilson wade'
    },
    {
        id: 7,
        type: 1,
        status: 1,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'pp@spiderman.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'peter parker'
    },
    {
        id: 8,
        type: 2,
        status: 2,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'dr@strange.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Stephen Strange'
    },
    {
        id: 9,
        type: 3,
        status: 3,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'agent@fury.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Nick fury'
    },
    {
        id: 10,
        type: 1,
        status: 4,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'ant@man.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Scott Lang'
    },
    {
        id: 11,
        type: 2,
        status: 5,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'vision@vision.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Jarvis mind'
    },
    {
        id: 12,
        type: 3,
        status: 6,
        startTime: new Date(),
        duration: 30,
        customerEmail: 'hack@eye.com',
        customerPhone: '8989898989',
        message: 'Hello',
        host: 'string',
        cancellationReason: 'I am not available for this meeting. Cancel it man',
        rejectionReason: 'string',
        customerName: 'Clint Barton'
    },

]; 