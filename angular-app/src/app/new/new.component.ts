import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Question } from '../question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  name;
  question :Question = new Question();

  constructor(public service:DataService,  private router: Router) {
    this.name = this.service.getUser();
   }

   onSubmit(){
     console.log("button clicked");
     this.question.author = this.service.getUser();
     console.log(this.question);
     this.service.createQuestion(this.question);
     this.router.navigate(['all']);
     this.question = new Question();
     this.router.navigate(['dashboard']);
   }

  ngOnInit() {
    this.name = this.service.getUser();
  }

  onCancel(){
    this.router.navigate(['dashboard']);
  }

}
