import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';
// var moment = require('moment');
import * as moment from 'moment';
import {CalendarService} from '../calendar.service'
import { CalendarEvent } from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subcategories } from '../subcategories';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events:CalendarEvent[];
  partnerEvents:CalendarEvent[];
  calendar=new Calendar();
  preferences:any[];//get it from database; assume [{event:eventID,frequency:number of days per event}]
  today:any=moment();
  user:any;

  constructor(
    private _CalendarService:CalendarService,
    private _UserService:UserService,
    private _route:Router,
  ) { }
   
  ngOnInit() {
    //Jonnathan: {email:'jswift@swift.net',pwd:'12345678'}
    this._UserService.login({email:'Arnold@muscles.net',pwd:'testing123'},(data)=>{this.user=data;
      console.log(this.user);
      this.initialize();
    });//hacky way to have persistant user
    if(false){//!this._UserService.isLoggedIn()){
      // this.onLogout();
    }else{
      this._UserService.users.subscribe(user=>{this.user=user;});
      console.log('first name: ',this.user.firstName);      
    }
  } 
/********************************* transplants from calendar.component.ts ******************************************** */
  initialize(){  
    //3.retrieve user from local storage: hard coding preferences for now
    this.preferences=this.generatePreferences(this.user.interests);
    // this.preferences=[
    //   {event:'shop together',interval:7},     
    // ]
    this.retrieveEvents(this.user._id,this.today,28);        
    this._CalendarService.events.subscribe(events=>{
      this.events=events;
      // console.log(this.events.length);
      //2.callback of events: prompt to generate events if none from now on ; 
      // if a week's elapsed, auto generate & alert for review or (prompt for generation and let user choose)
      // option to adjust preference / use your own preference for first timer / no partners yet
    });
    if(this.user._partner){    // get partner's events: \/    
      this._CalendarService.partnerEvents.subscribe(events=>{
        this.partnerEvents=events;
        for(let event of this.partnerEvents){
          event.color.primary='pink';
          event.color.secondary='purple';
        }
      });
      this._CalendarService.retrievePartnerEvents(this.user._partner);
      return;
    }
  }
  generateEvents(preferences,startDate,duration){ //move this to calendar service?
    return this.calendar.populate(this.user,moment().toDate(),duration,preferences);//move to service?
  }
  onGenerate(){
    moment("2012-02", "YYYY-MM").daysInMonth() // 29    
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
    const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
    console.log(`Generating a bunch of events per user request.`);  
    //   console.log('events are: ',events);
    this._CalendarService.overwriteEvents(
      this.user._id,this.generateEvents(
        this.preferences,this.today,28),
      (res)=>{//this.retrieveEvents(this.user._id,1,1);
        console.log('calling from component')}
      );//move to service?
  }
  generatePreferences(user_interests){
    var preferences=[];
    for(let interest of user_interests){
      let eventName=interest.name+': ';
      for(let subcategory of interest.subcategories){
        if(subcategory.interval<0.3){
          subcategory.interval=Infinity;//fixes infinite loop bug
        }
        preferences.push(
          {event:eventName+subcategory.title,
            interval:subcategory.interval}
          );
      }
    }
    console.log('preferences: ',preferences);
    return preferences;
  }
  retrieveEvents(user_id,startDate,duration){//first time directly receives from generateEvents, or call retrieveAll from service?
    this._CalendarService.retrieveEvents(user_id);
  };
  //4.addEvent(){}//from dashboard modal??
  onLogout(){
    this._UserService.logout();
  }
/********************************* end of transplants from calendar.component.ts *********************************************/











  



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
