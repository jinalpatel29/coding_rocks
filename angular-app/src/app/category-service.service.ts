import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CategoryService {
  tasks: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private _http: HttpClient) {
    this.getCategories();
  }

  getCategories() {
    console.log("hit get");
    this._http.get('/categories').subscribe(
      (data: any[]) => { this.tasks.next(data)}
    )
  }

}

