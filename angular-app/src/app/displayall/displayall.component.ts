import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { Category } from '../category';
import { CategoryService } from '../category-service.service';
import { InterestService } from '../interests.service';


@Component({
  selector: 'app-displayall',
  templateUrl: './displayall.component.html',
  styleUrls: ['./displayall.component.css']
})
export class DisplayallComponent implements OnInit {
  name;
  categories;
  questions;
  category_boolean = [];
  check_one: boolean;
  question: Question = new Question();
  constructor(public service: DataService, private _router: Router, private _categoryService: CategoryService, private _interestService: InterestService) {
    this.name = this.service.getUser();
  }

  onClick() {
    this._router.navigate(['/create']);
  }

  onQueClick(que) {
    this.service.setQuestionDisplay(que);
  }

  logout() {
    this.service.createUser("");
    this._router.navigate(['']);
  }

  onDelete(id) {
    this.service.deleteQuestion(id)
  }

  ngOnInit() {
    this._categoryService.getCategories();
    this._categoryService.tasks.subscribe(
      (data) => {
        this.categories = data;
        //set a boolean value in the category_boolean array that corresponds to the categories;
        this.categories.forEach(
          (element) => { this.category_boolean.push(false) }
        )
        this._interestService.updatePreferences(this.category_boolean);
      }
    );

    this.name = this.service.getUser();
    this.service.questionObserver.subscribe(
      (result) => this.questions = result
    )
    this.service.getAll();
  }

  select(idx) {
    this.check_one = false;
    this.category_boolean[idx] == true ? this.category_boolean[idx] = false : this.category_boolean[idx] = true;
    this._interestService.updatePreferences(this.category_boolean);
    //check to see if at least one item has been checked.
    this.category_boolean.forEach(
      (element) => {
        if (element) {
          this.check_one = true;
        }
      }
    );

    console.log(this.category_boolean[idx]);
  }

  filter() {
    console.log("test");
    this._router.navigateByUrl('quiz/subcategories/1');
  }


}
