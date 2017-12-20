import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  userObserver = new BehaviorSubject([]);
  data;
  constructor(private _http: HttpClient) { }

  register(user){
    this._http.post('/createUser',user).subscribe(
      (result) => this.data.next(result),
      errorResponse => console.log(errorResponse)
    )
  }
}
