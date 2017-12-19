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
  total = [false,false,false,false,false,false,false,false,false];
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

  select(idx) {
    this.total[idx] == true ? this.total[idx] = false : this.total[idx] = true;
    console.log(this.total[idx]);
  }


}
