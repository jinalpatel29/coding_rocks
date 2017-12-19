import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { Category } from '../category';
import { CategoryService } from '../category-service.service';


@Component({
  selector: 'app-displayall',
  templateUrl: './displayall.component.html',
  styleUrls: ['./displayall.component.css']
})
export class DisplayallComponent implements OnInit {
  name;
  categories;
  categories2;
  questions;
  category_boolean = [];
  check_one: boolean;
  question: Question = new Question();
  constructor(public service: DataService, private router: Router, private _categoryService: CategoryService) {
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
    this.categories = [
      {
        name: "Fashion",
        src: '/assets/images/fashion.jpg'
      },
      {
        name: "Drinks",
        src: '/assets/images/drinks.jpg'
      },
      {
        name: "Food",
        src: '/assets/images/food.jpg'
      },
      {
        name: "Travel",
        src: '/assets/images/travel.jpg'
      },
      {
        name: "Art",
        src: '/assets/images/art.jpg'
      },
      {
        name: "Reading",
        src: '/assets/images/reading.jpg'
      },
      {
        name: "Music",
        src: '/assets/images/music.jpg'
      },
      {
        name: "Movies",
        src: '/assets/images/movies.jpg'
      },
      {
        name: "Gifts",
        src: '/assets/images/gifts.jpg'
      },
    ]
    
    //set a boolean value in the category_boolean array that corresponds to the categories;
    this.categories.forEach(
      (element) => {this.category_boolean.push(false)}
    );

    this._categoryService.getCategories();
    this._categoryService.tasks.subscribe(
      (data) => {this.categories2 = data}
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
    //check to see if at least one item has been checked.
    this.category_boolean.forEach(
      (element) => { if (element){
        this.check_one = true;
      }}
    );

    console.log(this.category_boolean[idx]);
  }

  filter(){
    console.log("test");
  }


}
