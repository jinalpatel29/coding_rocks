import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

import {  OnInit } from '@angular/core';
import { Calendar } from './calendar';
import { Event } from './event';
import * as moment from 'moment';
import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent


@Injectable()
export class CalendarService {
  events: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // events:CalendarEvent[];
  user:any;
  calendar=new Calendar();
  preferences:any[];//get it from database; assume [{event:eventID,frequency:number of days per event}]
  // result ;
  constructor(private _http: HttpClient) { }
  // retrieveEvents(dateRange){
  //   console.log('calendar service works!');
  // }
  ngOnInit() {
    // this.calendar.retrieveEvents(1);
    // this.events= this.calendar.populate(1,moment().toDate(),28,this.preferences);//moment().format('MMMM Do YYYY')
  }
  // register(user){
  //   console.log("in service"+ user);
  //   this._http.post('/createUser',user).subscribe(
  //     (data: any[]) => { this.users.next(data)},
  //     errorResponse => console.log(errorResponse)
  //   )
  // }
  // generateEvent(preferences,startDate,duration){
  //   this.calendar.populate(this.user,moment().toDate(),duration,preferences);
  // }
  retrieveEvents(){//also grabs user_id from local storage, hard coded from express for now
    this._http.get('/events/').subscribe(
      (events:any[])=>{this.events.next(events);
      console.log('event size:',events.length);
      },
      (err)=>{console.log(err)}
    )
  }
  overwriteEvents(events){//also grabs user_id from local storage, hard coded from express for now; option to append or overwrite or simply update particular ones
    console.log('overwritingEvents from events service');
    this._http.post('/events',{events:events}).subscribe(
      (res)=>{},
      (err)=>{console.log(err)}
    )
  }
}
  