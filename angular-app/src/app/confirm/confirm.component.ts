import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  partnerEvents:any[];
  pastEvent: any[];
  firstName;
  constructor(private eservice: CalendarService) { }

  ngOnInit() {
    this.firstName = sessionStorage.getItem('firstName');
    this.eservice.partnerEvents.subscribe(
      (result) => {
        this.partnerEvents = result;
        this.pastEvent = result.filter(function(event) {
          return new Date(event['start']) < new Date();
        })
      }
    );
    this.eservice.retrievePartnerEvents("5a39b97c7c5f371b0c1190ea");
    console.log(sessionStorage.getItem('firstName'));
  }

}
