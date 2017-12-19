import {Event} from './event'
export class Calendar {
    constructor(
        public preferences={
            subCategory:[],
            frequency:[],
        }
    ){};
    //populate is the top level behind the scenes method; dateRange provides flexibility e.g. user only wants to populate one month at a time
    populate(user, dateRange):Event[] {//do this over a range, resolve / generate on a single event basis
        //add generated events to local calendar
        var tempFrequencies=this.updateFrequency(user.frequencies,dateRange);
        var events:Event[]=this.generate(tempFrequencies,dateRange);
        for(let event of events){
            this.resolveConflict(event);
        }
        return 
        // return resolved Events
    }
    updateFrequency(frequencies,dateRange){//read loveful's events
        //load google calendar to generate currentFrequencies = confirmed lovefool events
        //return frequencies - currentFrequencies
    }
    resolveConflict(generatedEvent): void {
        //loads google calendar of the date block that the event is in, e.g. the week where a weekly event is assigned to
        //returns the first available time slot that the event can fit to
        //ninja level: heuristic rules: movies happen at night; morning jog happens in the morning; spacing weekly events out
        // return generatedEvent;
    }
    generate(preferences,dateRange): Event[] {//randomness or strictly follow frequency? probably later
        var events:Event[] = [];
        var newEvent=new Event();
        newEvent.location='San Jose';
        events.push(newEvent);
        var newEvent=new Event();
        newEvent.location='Palo Alto';
        events.push(newEvent);
        //takes preferences, and randomly (following heuristic rules) generate events in a particular dateRange
        //e.g. daily & weekly events will be populated in a week, monthly events has 25% chance to be populated in this week ;
        return events;
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
}

