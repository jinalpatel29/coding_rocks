import {Event} from './event';
// import {CalendarService} from './calendar.service'
import * as moment from 'moment';
// import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
// import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


export class Calendar {  
    // _CalendarService=new CalendarService();
    events:CalendarEvent[];//holder of events to be displayed on a particular page
    // constructor(
    //     public preferences={
    //         subCategory:[],
    //         frequency:[],
    //     },
    //     private _CalendarService: CalendarService
    // ){};
    //populate is the top level behind the scenes method; dateRange provides flexibility e.g. user only wants to populate one month at a time
    populate(user:any, startDate:Date,duration:any,preferences:any[]) {//do this over a range, resolve / generate on a single event basis
        //add generated events to local calendar
        var tempPreferences=this.updateFrequencies(preferences,duration);//frequencies from use later
        var events=this.generate(tempPreferences,startDate,duration);
        for(let event of events){
            event['creator']=user._id;            
            this.resolveConflict(event);
        }
        return events;
        // return resolved Events
    }
    // addDays = function(date:Date,noOfDays) {
    //     date.setTime(date.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
    //     return date;
    // }
    generate(preferences,startDate:Date,duration): CalendarEvent[] {//randomness or strictly follow frequency? probably later
        var events:CalendarEvent[] = [];
        console.log('date range: ',duration)
        for(let interest of preferences){
            // console.log('interest: ',interest);
            for(let i =0;i< duration;i+=interest.interval){
                var newEvent=new Event(interest.event,moment(startDate, "MMMM Do YYYY").add(i,'days').toDate());//moment(startDate, "MMMM Do YYYY").add(i,'days').format('MMMM Do YYYY'));this.addDays(startDate,i)
                // newEvent.location='San Jose';
                // console.log('adding events');
                events.push(newEvent);
            }
        }
        // var newEvent=new Event(frequencies.event);
        // newEvent.location='San Jose';
        // events.push(newEvent);
        // console.log(events);
        //takes preferences, and randomly (following heuristic rules) generate events in a particular dateRange
        //e.g. daily & weekly events will be populated in a week, monthly events has 25% chance to be populated in this week ;   
        return events;
    }
    updateFrequencies(preferences,dateRange){//read loveful's events
        //load google calendar to generate currentFrequencies = confirmed lovefool events
        //return frequencies - currentFrequencies
        return preferences;
    }
    resolveConflict(generatedEvent): void {
        //loads google calendar of the date block that the event is in, e.g. the week where a weekly event is assigned to
        //returns the first available time slot that the event can fit to
        //ninja level: heuristic rules: movies happen at night; morning jog happens in the morning; spacing weekly events out
        // return generatedEvent;
    }

    heuristicRules(){
        //list of rules
        //ninja level: heuristic rules: movies happen at night; morning jog happens in the morning; spacing weekly events out

    }
    ////////////////methods for the user
    addEvent(event){
        //adds the event given its time and category; 
        //might add methods to randomly generate time / category
    }
    // retrieveEvents(dateRange){
    //     this._CalendarService.retrieveEvents(dateRange);
    // }
}

