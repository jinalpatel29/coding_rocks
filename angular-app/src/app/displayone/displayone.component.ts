import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InterestService } from '../interests.service';
import { CategoryService } from '../category-service.service';
import { Category } from '../category';
import { Subcategories } from '../subcategories';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-displayone',
  templateUrl: './displayone.component.html',
  styleUrls: ['./displayone.component.css']
})
export class DisplayoneComponent implements OnInit {
  user;
  category_boolean: any[];
  user_profile = [];
  user_id="5aaab233333"
  categories;
  
  constructor(public service: DataService, private router: Router, private _route: ActivatedRoute, private _interestService: InterestService, private _categoryService: CategoryService, private _userService: UserService ) {
    this.user = this._userService.getSessionUser();
  }

  ngOnInit() {
    this._userService.users.subscribe(
      (user) => {this.user = user}
    );

    this.category_boolean = this._interestService.getPreferences();
    this._categoryService.tasks.subscribe(
      (data) => {
        this.categories = data;
        if (data) {
          for (var i = 0; i < this.categories.length; i++) {
            if (this.category_boolean[i] == true) {
              var new_object = {}
              new_object['name'] = this.categories[i].name;
              var new_arr = [];
              for(var r = 0; r < this.categories[i].subcategories.length; r++){
                var new_sub = {}
                new_sub['title'] = this.categories[i].subcategories[r].title;
                new_sub['keep'] = false;
                new_arr.push(new_sub);
              }
              new_object['subcategories'] = new_arr;
              this.user_profile.push(new_object);
            }
          }
        }
      }
    );
  }

  onLike(opt) {

  }
  goToQuiz() {
    this.router.navigate(['quiz']);
  }

  addInterests() {
    var result = [];
    //loop through user_profile to see which subcategories were selected
    for (var user of this.user_profile){
      var new_obj = {};
      new_obj['name'] = user.name;
      var new_arr = [];
      for (var sub of user.subcategories){
        if(sub.keep){
          var sub_obj = {};
          sub_obj['title'] = sub.title;
          sub_obj['interval'] = 0;
          new_arr.push(sub_obj);
        }
      }
      if(new_arr.length){
        new_obj['subcategories'] = new_arr;
        result.push(new_obj);
      }
    }
    var interests_obj = {
      user_id: this.user._id,
      result: result
    }
    this.service.addInterests(interests_obj);
    this.router.navigateByUrl('dashboard');
  }

}
