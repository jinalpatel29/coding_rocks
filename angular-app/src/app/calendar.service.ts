import { Injectable } from '@angular/core';

@Injectable()
export class CalendarService {

  constructor() { }
  retrieveEvents(dateRange){
    console.log('calendar service works!');
  }
}
