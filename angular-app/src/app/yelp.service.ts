import { Injectable } from '@angular/core';
import { Yelp } from '../config/config';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YelpService {

  constructor(private _http: HttpClient) { }
  testQuery(query,callback){
    this._http.post('/yelp/recommendOne',query).subscribe(event=>callback(event));
  }
}
