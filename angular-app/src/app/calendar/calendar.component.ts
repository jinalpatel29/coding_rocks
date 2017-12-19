import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events:Event[];
  calendar=new Calendar();
  constructor() { }

  ngOnInit() {
    this.events= this.calendar.populate(1,1);
  }
  
}
