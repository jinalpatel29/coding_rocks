import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class UserService {
  //userObserver = new BehaviorSubject([]);
  users: BehaviorSubject<any[]> = new BehaviorSubject([]);
  result ;
  constructor(private _http: HttpClient, private _dataServ: DataService) { }

  register(user){
    console.log("in service"+ user);
    this._http.post('/createUser',user).subscribe(
      (data: any[]) => { this.users.next(data)},
      errorResponse => console.log(errorResponse)
    )
  }

  login(info){
    console.log("in service"+ info);
    this._http.post('login',info).subscribe(
      (data: any[]) => { this.users.next(data)},       
      errorResponse => console.log(errorResponse)
    )
  }
}
