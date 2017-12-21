import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { PartnerService } from './partner.service';

@Injectable()
export class UserService {
  // userObserver = new BehaviorSubject([]);
  users: BehaviorSubject<any[]> = new BehaviorSubject([]);
  result ;
  constructor(
    private _http: HttpClient,
    private _dataServ: DataService,
    private _route: Router,
    private _partnerService: PartnerService
  ) { }

  register(user) {
    console.log('in service' + user);
    this._http.post('/createUser', user).subscribe(
      (data: any[]) => { this.users.next(data); },
      errorResponse => console.log(errorResponse)
    );
  }

  login(info, callback) {
    console.log('in service' + info);
    this._http.post('login', info).subscribe(
      (data: any[]) => {
        this.users.next(data);
        callback(data);
      },
      errorResponse => console.log(errorResponse)
    );
  }
  isLoggedIn() {
    if (sessionStorage) {
      if ( sessionStorage.getItem('_id') && sessionStorage.getItem('name') ) {
        console.log(sessionStorage.getItem('name') + ' is logged in already!!!' );
        return true;
      } else {
        return false;
      }
    }
  }
  logout() {
    sessionStorage.clear();
    this._route.navigate(['']);
  }

  addPartner(link) {
    this._http.post('/link', link).subscribe(
      (data: any[]) => { 
        this.users.next(data);
      },
      errorResponse => console.log(errorResponse)
    );
  }

}
