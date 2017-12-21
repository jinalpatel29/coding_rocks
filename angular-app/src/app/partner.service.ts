import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable()
export class PartnerService {
  // userObserver = new BehaviorSubject([]);
  partner: BehaviorSubject<any[]> = new BehaviorSubject([]);
  result ;
  constructor(
    private _http: HttpClient,
    private _dataServ: DataService,
    private _route: Router
  ) { }

  getPartner(email){
    console.log("in find partner");
    console.log(email);
    this._http.post('/partner', email).subscribe(
      (data: any) => {this.partner.next(data)}
    )
    
  }

  getRequestors(requests){
    this._http.post('/partner/requests', requests).subscribe(
      (data: any) => {this.partner.next(data)}
    )
  }
  
}
