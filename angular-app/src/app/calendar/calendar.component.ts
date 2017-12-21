import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';
// var moment = require('moment');
import * as moment from 'moment';
import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent
import {CalendarService} from '../calendar.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events:CalendarEvent[];
  calendar=new Calendar();
  preferences:any[];//get it from database; assume [{event:eventID,frequency:number of days per event}]
  today:any=moment();
  user:any;

  constructor(private _CalendarService:CalendarService) { }
   
  ngOnInit() {
    //3.retrieve user from local storage: hard coding preferences for now
    this.preferences=[
      {event:'shop together',interval:7},
      // {event:'',freq:},
      {event:'fancy dinner',interval:7},
      {event:'dinner',interval:1},
      {event:'outdoors event',interval:28},
      {event:'movie',interval:14},      
    ]
    this.retrieveEvents(this.today,28);        
    //1.subscribe to calendar service \/
    this._CalendarService.events.subscribe(events=>{
      this.events=events;
      // console.log(this.events.length);
      //2.callback of events: prompt to generate events if none from now on ; 
      // if a week's elapsed, auto generate & alert for review or (prompt for generation and let user choose) 
      // option to adjust preference / use your own preference for first timer / no partners yet

    });
  } 
  generateEvents(preferences,startDate,duration){ //move this to calendar service?
    return this.calendar.populate(this.user,moment().toDate(),duration,preferences);//move to service?
  }
  onGenerate(){
    console.log(`Generating a bunch of events per user request.`);  
    //   console.log('events are: ',events);
    this._CalendarService.overwriteEvents(this.generateEvents(this.preferences,this.today,28));//move to service?
    this.retrieveEvents(1,1);    
  }
  retrieveEvents(startDate,duration){//first time directly receives from generateEvents, or call retrieveAll from service?
    this._CalendarService.retrieveEvents();
  };
  //4.addEvent(){}//from dashboard modal??




  // if(this.events.length===0){
  //   console.log(`Generating a bunch of events because there aren't any.`);  
  //   console.log('events are: ',events);
  // this.events=this.generateEvents(this.preferences,this.today,28);
  // this._CalendarService.overwriteEvents(this.events);
  //     }



  // onChange(){
  //   this.result=this.today.setTime(this.today.getTime() + (this.nod * (1000 * 60 * 60 * 24)))
  // }
}
