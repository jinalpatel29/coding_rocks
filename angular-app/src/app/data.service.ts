import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  dataObserver = new BehaviorSubject([]);
  result;
  author: string;
  options =[];

  constructor(private _http: HttpClient) { }

  createUser(author) {
    console.log(author);
    this.author = author;
  }

  getUser() {
    return this.author;
  }

  addInterests(result){
    console.log(result);
    this._http.post('/interests', result).subscribe(
      (response: any) => {
        this.dataObserver.next(response);
      }
    );
  }

  addRequest(link_request){
    console.log("in data service");
    console.log(link_request);
    this._http.put('/request/' + link_request.partner_id, link_request).subscribe(
      (response: any) => {
        this.dataObserver.next(response);
      }
    );
  }

  invite(email){
    console.log("in service");
    console.log(email);
    return this._http.post('/invite', email)
  }

}
