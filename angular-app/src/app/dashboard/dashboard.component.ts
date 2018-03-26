// import { Component, OnInit } from '@angular/core';
import {
  CalendarHeaderComponent
} from '../calendar-header/calendar-header.component';
import {
  DateTimePickerComponent
} from '../date-time-picker/date-time-picker.component';
import {
  UserService
} from '../user.service';

//for loveFool's calendar Class
import {
  Calendar
} from '../calendar';
import {
  Event
} from '../event';
import * as moment from 'moment';
import {
  CalendarService
} from '../calendar.service'
import {
  Router
} from '@angular/router';
import {
  Subcategories
} from '../subcategories';


import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  Subject
} from 'rxjs/Subject';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  NgbDropdownConfig
} from '@ng-bootstrap/ng-bootstrap';
import {
  DataService
} from '../data.service';
import { YelpService } from '../yelp.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
  providers: [NgbDropdownConfig]
})
export class DashboardComponent {
  @ViewChild('modalContent') modalContent: TemplateRef < any > ;
  view: string = 'month';
  activeday = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [{
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({  event  }: {    event: CalendarEvent  }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({
        event
      }: {
        event: CalendarEvent
      }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject < any > = new Subject();

  activeDayIsOpen: boolean = true;
  /*********** loveful custom ***********/
  events:CalendarEvent[];
  newEvent: CalendarEvent;
  selfEvents: CalendarEvent[];
  partnerEvents: CalendarEvent[];
  calendar = new Calendar();
  preferences: any[]; //get it from database; assume [{event:eventID,frequency:number of days per event}]
  today: any = moment();
  user: any;
  partner:any;
  pendingRequests;
  /*********** end of loveful custom ***********/

  constructor(
    private modal: NgbModal,
    config: NgbDropdownConfig,
    private _CalendarService: CalendarService,
    private _UserService: UserService,
    private _route: Router,
    private _yelp: YelpService, ) {
    // config.placement = 'top-left';
    config.autoClose = false;
  }


  ngOnInit() {
    if (!this._UserService.isLoggedIn()) {
      this._UserService.logout();
    } else {
      this.user = this._UserService.getSessionUser(); //users.subscribe(user=>{this.user=user;});
      console.log('first name: ', this.user.firstName);
      this.pendingRequests = this.user.requests.length;
      console.log("pending requests are :"+this.pendingRequests);
      this.initialize();
    }
  }
  //(date, events of the date) => set veDate=date
  dayClicked({
    date,
    events
  }: {
    date: Date;events: CalendarEvent[]
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.activeday = false;
        this.newEvent=new Event('title',date);
        this.handleEvent('Clicked Blanck',this.newEvent);//hacky
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
        this.activeday = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    // this.handleEvent('Dropped or resized', event);
    // console.log(event['creator'],', and ',this.user._id)
    if(event['creator'] && event['creator']==this.user._id){
      event.start = newStart;
      event.end = newEnd;
      this._CalendarService.overwriteEvents(this.user._id,this.selfEvents);
    }
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('action: ',action, ' event: ',event);
    this.modalData = {
      event,
      action
    };
    this.modal.open(this.modalContent, {
      size: 'lg'
    });
  }

  addEvent(){
    this.newEvent['creator']=this.user._id;
    this.selfEvents.push(this.newEvent);
    this._CalendarService.overwriteEvents(this.user._id,this.selfEvents);
  }
  // addEvent(): void {   //vanilla addEvent
  //   this.events.push({
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   this.refresh.next();
  // }

  // lineChart
  public lineChartData: Array < any > = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Username'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Partner Name'
    },
  ];
  public lineChartLabels: Array < any > = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array < any > = [{ // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  /********************************* transplants from calendar.component.ts ******************************************** */
  initialize() {  //called inside ngOnInit(), after retrieving user from session
    this.preferences = this.generatePreferences(this.user.interests);
    // this.preferences=[  {event:'shop together',interval:7}, ] //should turn this into a type
    this.retrievePartnerEvents();//this should be done before retrieving self events due to the two events arrays are concatnated
    this.retrieveSelfEvents();
  }

  onGenerate() {
    var targetDay = this.today; //modify this to the day you want in the calendar library
    var targetMonth = moment(targetDay.format('YYYY-MM'), "YYYY-MM");
    var duration = targetMonth.daysInMonth();
    var startDate = targetMonth.startOf('month').toDate(); //returns a moment object
    console.log('startDate: ', startDate, '; duration: ', duration)
    // const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
    // const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
    console.log(`Generating a bunch of events per user request.`);
    //   console.log('events are: ',events);
    this._CalendarService.overwriteEvents(
      this.user._id, this.generateEvents(
        this.preferences, startDate, duration),
      (res) => { //this.retrieveEvents(this.user._id,1,1);
        console.log('calling from component')
      }
    ); //move to service?
  }
  onRecommend(){
    this._yelp.testQuery({
      term:'food: mexican',
      location: 'San Jose, CA'
    },(business)=>{console.log(business)
      var date=new Date;
      this.newEvent=new Event('fate',date);
      this.newEvent['business']={
        image_url:business.image_url,
        name:business.name,
        address:business.location,
        isOpen:!business.is_closed,
      };
      this.handleEvent('yelp',this.newEvent);
    })
  }
  
  retrievePartnerEvents(){
    if (this.user._partner) { // get partner's events: \/  
    this._CalendarService.retrievePartnerEvents(this.user._partner);    
    this._CalendarService.partnerEvents.subscribe(events => {
      this.partnerEvents = events;
      this.partnerEvents.forEach((event,index,events)=>{
        event.start=new Date(event.start);
        event.color={primary : 'pink',secondary : '#FEA403'};
      })
    });
    this.partner=this._UserService.getUser(this.user._partner,(partner)=>{this.partner = partner})
  }
  };//this should be done before retrieving self events due to the two events arrays are concatnated
  retrieveSelfEvents(){
    this._CalendarService.retrieveEvents(this.user._id);//should make dynamic
    this._CalendarService.events.subscribe(events => {
      this.selfEvents = events;
      for (let event of this.selfEvents) {
        event.color={primary : 'blue',secondary : '#00CED1'};
        event.start = new Date(event.start); //very expensive???
      }
      console.log('partner event number: ',this.partnerEvents.length);
      this.events=this.selfEvents.concat(this.partnerEvents);
      //2.callback of events: prompt to generate events if none from now on ; 
      // if a week's elapsed, auto generate & alert for review or (prompt for generation and let user choose)
      // option to adjust preference / use your own preference for first timer / no partners yet
    });
  };
  generateEvents(preferences, startDate: Date, duration) { //move this to calendar service?
    return this.calendar.populate(this.user, startDate, duration, preferences); //move to service?
  }
  generatePreferences(user_interests) {
    var preferences = [];
    for (let interest of user_interests) {
      let eventName = interest.name + ': ';
      for (let subcategory of interest.subcategories) {
        if (subcategory.interval < 0.3) {
          subcategory.interval = Infinity; //fixes infinite loop bug
        }
        preferences.push({
          event: eventName + subcategory.title,
          interval: subcategory.interval
        });
      }
    }
    console.log('preferences: ', preferences);
    return preferences;
  }
  retrieveEvents(user_id, startDate: Date, duration) { // unused wrapper
    this._CalendarService.retrieveEvents(user_id);
  }
  // 4.addEvent(){}//from dashboard modal??
  logout() {
    this._UserService.logout();
  }
  /********************************* end of transplants from calendar.component.ts *********************************************/
}
