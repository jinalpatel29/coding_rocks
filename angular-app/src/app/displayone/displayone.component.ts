import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { Option } from '../option';
import { InterestService } from '../interests.service';

@Component({
  selector: 'app-displayone',
  templateUrl: './displayone.component.html',
  styleUrls: ['./displayone.component.css']
})
export class DisplayoneComponent implements OnInit {
  interests_boolean: any[];
  name;
  question_id;
  options;
  question;
  option : Option = new Option();
  // question : any = new Question();
  constructor(public service: DataService, private router: Router, private _route: ActivatedRoute, private _interestService: InterestService) {
    this.name = this.service.getUser();
  }

  ngOnInit() {
    this.interests_boolean = this._interestService.getPreferences(); 
    this.question = this.service.getQuestionDisplay();
    this._route.paramMap.subscribe(params => {
      this.service.getQuestion(params.get('id')).subscribe(
        (result) => this.options = result       
      )
    })     
  }

  onLike(opt) {
    this.option = opt;
    this.option.rating +=1;
    this.service.updateRating(this.option);
  }
  goToPoll() {
    this.router.navigate(['dashboard']);
  }
}
