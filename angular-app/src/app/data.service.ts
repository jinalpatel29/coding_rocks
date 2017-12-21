import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  questionObserver = new BehaviorSubject([]);
  result;
  author: string;
  options =[];
  questionDisplay;
  constructor(private _http: HttpClient) { }

  createUser(author) {
    console.log(author);
    this.author = author;
  }

  getUser() {
    return this.author;
  }
  
  setQuestionDisplay(question){
    this.questionDisplay = question;
  }

  getQuestionDisplay(){
    return this.questionDisplay;
  }

  addInterests(result){
    console.log(result);
    this._http.post('/interests', result).subscribe(
      (response: any) => {
        this.questionObserver.next(response);
      }
    );
  }

  addRequest(link_request){
    console.log("in data service");
    console.log(link_request);
    this._http.put('/request/' + link_request.partner_id, link_request).subscribe(
      (response: any) => {
        this.questionObserver.next(response);
      }
    );
  }

  createQuestion(question: any) {
    this.options = question.options;
    console.log("in service")
    this._http.post('/create', question).subscribe(
      (response) => this.getAll(),
      errorResponse => console.log(errorResponse)
    );
  }

  getAll() {
    this._http.get('/all').subscribe(
      (response: any) => {
        this.questionObserver.next(response);
      },
      (errorResponse) => console.log(errorResponse)
    );
  }

  getQuestion(id: string) {
    return this._http.get('/question/' + id)
  }

  updateRating(opt: any) {
    console.log("in service");
    console.log(opt._id);
    this._http.put('/option/' + opt._id, opt).subscribe(
      (response) => this.getAll(),
      errorResponse => console.log(errorResponse)
    )
  }
  
  deleteQuestion(id: string){
    console.log("in service"+id);
    return this._http.delete('/question/'+id).subscribe(
      (result : any) => this.getAll()
    )
  }



  // getNote(id: string) {
  //   return this._http.get('/note/' + id)    
  // }

  // updateNote(note: any) {
  //   console.log("in service");
  //   console.log(note);
  //   return this._http.put('/note/'+note._id, note)
  // }



}
