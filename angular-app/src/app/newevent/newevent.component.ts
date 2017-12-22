import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';
import * as moment from 'moment';
import {CalendarEvent} from 'angular-calendar';
import { UserService } from '../user.service';
// ,CalendarEventAction,CalendarEventTimesChangedEvent

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {
  event:CalendarEvent;
  constructor(private _userService: UserService) { }

  ngOnInit() {
  }
  logout() {
    this._userService.logout();
  }

}
