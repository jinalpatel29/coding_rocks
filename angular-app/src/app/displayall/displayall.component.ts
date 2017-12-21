import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category-service.service';
import { InterestService } from '../interests.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-displayall',
  templateUrl: './displayall.component.html',
  styleUrls: ['./displayall.component.css']
})
export class DisplayallComponent implements OnInit {
  name;
  user;
  categories;
  questions;
  category_boolean = [];
  check_one: boolean;
  constructor (
    public service: DataService,
    private uservice: UserService,
    private _router: Router,
    private _categoryService: CategoryService,
    private _interestService: InterestService
  ) {
    this.name = this.service.getUser();
    this.uservice.users.subscribe(
      (result) => {
        this.user = result;
        this.service.createUser(this.user.firstName);
        console.log(this.user);
      }
    );
  }

  onClick() {
    this._router.navigate(['/create']);
  }

  onQueClick(que) {
    this.service.setQuestionDisplay(que);
  }

  logout() {
    // this.service.createUser("");
    // this._router.navigate(['']);
    this.uservice.logout();
  }

  onDelete(id) {
    this.service.deleteQuestion(id);
  }

  ngOnInit() {
    if ( !this.uservice.isLoggedIn()) {
      this.uservice.logout();
    }
    this._categoryService.getCategories();
    this._categoryService.tasks.subscribe(
      (data) => {
        this.categories = data;
        // set a boolean value in the category_boolean array that corresponds to the categories;
        this.category_boolean = [];
        this.categories.forEach(
          (element) => { this.category_boolean.push(false) }
        )
        console.log(this.category_boolean);
      }
    );

    this.uservice.users.subscribe(
      (result) =>{ this.user = result;
        this.service.createUser(this.user.firstName);      
      console.log(this.user)}
    )  

    this.service.questionObserver.subscribe(
      (result) => this.questions = result
    )
    this.service.getAll();
  }

  select(idx) {
    this.check_one = false;
    this.category_boolean[idx] == true ? this.category_boolean[idx] = false : this.category_boolean[idx] = true;
    this._interestService.updatePreferences(this.category_boolean);
    // check to see if at least one item has been checked.
    this.category_boolean.forEach(
      (element) => {
        if (element) {
          this.check_one = true;
        }
      }
    );
  }

  filter() {
    console.log("test");
    this._router.navigateByUrl('quiz/subcategories/1');
  }


}
