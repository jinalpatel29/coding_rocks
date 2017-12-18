import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Question } from '../question';


@Component({
  selector: 'app-displayall',
  templateUrl: './displayall.component.html',
  styleUrls: ['./displayall.component.css']
})
export class DisplayallComponent implements OnInit {
  name;
  questions;
  total = [1,2,3,4,5,6,7,8,9,10];
  question: Question = new Question();
  constructor(public service: DataService, private router: Router) {
    this.name = this.service.getUser();
  }

  onClick() {
    this.router.navigate(['/create']);
  }

  onQueClick(que) {
    this.service.setQuestionDisplay(que);
  }

  logout(){
    this.service.createUser("");
    this.router.navigate(['']);
  }

  onDelete(id){
    this.service.deleteQuestion(id)
  }


  ngOnInit() {
    this.name = this.service.getUser();
    this.service.questionObserver.subscribe(
      (result) => this.questions = result
    )
    this.service.getAll();
  }


}
