import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent

export class Event implements CalendarEvent {
    // start: Date;
    end?: Date;
    // title: string;
    // color: EventColor;
    // actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean; 
    };
    draggable=true;//?: boolean;
    // meta?: MetaType;
    
    
    location:string;
    // summary:string;
    description:string; 
    status:string;
    reminders:any[];
    attachments:any[];
    color={primary:'blue',secondary:'green'}
    
    interest:string;//points / frequency
    creator:'';
    receiver:'';

    constructor(
        public title:string,
        public start:Date,
    ){};
    delete=function(){};
    insert=function(){};
    update=function(){};
}