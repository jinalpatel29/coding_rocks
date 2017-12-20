import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';
// var moment = require('moment');
import * as moment from 'moment';
import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // today=new Date();
  // nod:number;
  // mult:number;
  // result;
  events:CalendarEvent[];
  calendar=new Calendar();
  preferences:any[];//get it from database; assume [{event:eventID,frequency:number of days per event}]
  constructor() { }
   
  ngOnInit() {
    this.calendar.retrieveEvents(1);
    this.preferences=[
      {event:'shop together',interval:7},
      // {event:'',freq:},
      {event:'fancy dinner',interval:7},
      {event:'dinner',interval:1},
      {event:'outdoors event',interval:28},
      {event:'movie',interval:14},      
    ]
    this.events= this.calendar.populate(1,moment().toDate(),28,this.preferences);//moment().format('MMMM Do YYYY')
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    
  } 
  // onChange(){
  //   this.result=this.today.setTime(this.today.getTime() + (this.nod * (1000 * 60 * 60 * 24)))
  // }
}
