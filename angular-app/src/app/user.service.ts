import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { PartnerService } from './partner.service';

@Injectable()
export class UserService {
  // userObserver = new BehaviorSubject([]);
  users: BehaviorSubject<any[]> = new BehaviorSubject([]);
  result ;
  partner:any;
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
        sessionStorage.setItem('_id', data['_id']);
        sessionStorage.setItem('firstName', data['firstName']);
        sessionStorage.setItem('user', JSON.stringify(data));
        callback();
      },
      errorResponse => console.log(errorResponse)
    );
  }
  getSessionUser() {
    if ( this.isLoggedIn() ) {
      return JSON.parse(sessionStorage.user);
    } else {
      return null;
    }
  }
  addPoints(id, pointsObj) {
    return this._http.put('/addpoints/' + id, pointsObj);
  }

  isLoggedIn() {
    if (sessionStorage) {
      if ( sessionStorage.getItem('_id') ) {
        console.log(sessionStorage.getItem('firstName') + ' is logged in already!!!' );
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
  getUser(user_id,callback){
    this._http.post('/user/'+user_id,{}).subscribe(callback);
  }
  //from home.component.ts: login(info) {
  //   console.log('in login');
  //   console.log(info);
  //   this._uservice.login(info, (data) => {
  //     sessionStorage.setItem('_id', data['_id']);
  //     sessionStorage.setItem('name', data['name']);
  //     console.log('Logged in...');
  //     this.router.navigate(['/dashboard']);
  //   });
  // }
}
