import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  dataObserver = new BehaviorSubject([]);
  result;

  constructor(private _http: HttpClient) { }

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
