import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { Event } from '../event';
import * as moment from 'moment';
import {CalendarEvent} from 'angular-calendar';//,CalendarEventAction,CalendarEventTimesChangedEvent
import { UserService } from '../user.service';
import { _keyValueDiffersFactory } from '@angular/core/src/application_module';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {
  event:CalendarEvent;
  user;

  constructor(private _uservice: UserService) { }

  ngOnInit() {
    this.user = this._uservice.getSessionUser();
  }
  logout() {
    this._uservice.logout();
  }

}
