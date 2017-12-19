import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InterestService } from '../interests.service';
import { CategoryService } from '../category-service.service';
import { Category } from '../category';
import { Subcategories } from '../subcategories';

@Component({
  selector: 'app-displayone',
  templateUrl: './displayone.component.html',
  styleUrls: ['./displayone.component.css']
})
export class DisplayoneComponent implements OnInit {
  category_boolean: any[];
  name;
  question_id;
  options;
  question; 
  categories;
  // question : any = new Question();
  constructor(public service: DataService, private router: Router, private _route: ActivatedRoute, private _interestService: InterestService, private _categoryService: CategoryService) {
    this.name = this.service.getUser();
  }

  ngOnInit() {
    this.category_boolean = this._interestService.getPreferences();
    this._categoryService.tasks.subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  onLike(opt) {
   
  }
  goToPoll() {
    this.router.navigate(['dashboard']);
  }
}
