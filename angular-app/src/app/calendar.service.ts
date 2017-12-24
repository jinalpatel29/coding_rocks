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
  events: BehaviorSubject<any[]> = new BehaviorSubject([]);// events:CalendarEvent[];
  partnerEvents: BehaviorSubject<any[]> = new BehaviorSubject([]);
  user:any;
  calendar=new Calendar();
  preferences:any[];//get it from database; assume [{event:eventID,frequency:number of days per event}]
  constructor(private _http: HttpClient) { }
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
  retrieveEvents(user_id){//also grabs user_id from local storage, hard coded from express for now
    this._http.get('/events/'+user_id).subscribe(
      (events:any[])=>{this.events.next(events);
      console.log('event size:',events.length);
      },
      (err)=>{console.log(err)}
    )
  }
  retrievePartnerEvents(user_id) {
    // also grabs user_id from local storage, hard coded from express for now
    console.log(user_id);
    this._http.get('/events/'+user_id).subscribe(
      (events:any[])=>{this.partnerEvents.next(events);
      console.log('event size:',events.length);
      },
      (err)=>{console.log(err)}
    )
  }
  overwriteEvents(user_id,events,callback=(res)=>{}){//also grabs user_id from local storage, option to append or overwrite or simply update particular ones?
    console.log('overwritingEvents from events service');
    this._http.post('/events/'+user_id,{events:events}).subscribe(
      (res)=>{callback(res); this.retrieveEvents(user_id)},
      (err)=>{console.log(err)}
    )
  }
}
  