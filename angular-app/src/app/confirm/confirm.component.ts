import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  partnerEvents: any[];
  pastEvent: any[];
  firstName;
  constructor(
    private eservice: CalendarService,
    private _user: UserService
  ) { }

  ngOnInit() {
    this.firstName = sessionStorage.getItem('firstName');
    this.eservice.partnerEvents.subscribe(
      (result) => {
        this.partnerEvents = result;
        this.pastEvent = result.filter(function(event) {
          return (new Date(event['start']) < new Date()) && (!event['completed']);
        });
      }
    );
    this.eservice.retrievePartnerEvents(this._user.getSessionUser()['_partner']);
    console.log('*******Partner********');
    console.log(this._user.getSessionUser()['_partner']);
    console.log('*******Partner********');
  }

  confirmLove(event) {
    event.completed = true;
    // console.log('Confirm Love ', startDate);
    this.eservice.overwriteEvents(this._user.getSessionUser()['_partner'], this.partnerEvents, () => {
      this._user.addPoints(this._user.getSessionUser()['_partner'], {'points': 10}).subscribe(
        (response) => {
          console.log(response);
        }
      );
    });
  }

  denyLove(startDate) {
    console.log('Deny Love ', startDate);
  }
}
