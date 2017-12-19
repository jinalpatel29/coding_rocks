import { Injectable } from '@angular/core';

@Injectable()
export class InterestService {
  preferences: boolean[] = [];
  constructor() {
  }

  getPreferences(){
    return this.preferences;
  }

  updatePreferences(preferences: boolean[]){
    this.preferences = preferences;
  }

}
