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
  user_profile = [];
  question_id;
  options;
  question;
  categories;
  name;
  constructor(public service: DataService, private router: Router, private _route: ActivatedRoute, private _interestService: InterestService, private _categoryService: CategoryService) {
    this.name = this.service.getUser();
  }

  ngOnInit() {
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
                new_sub['name'] = this.categories[i].subcategories[r].name;
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
  goToPoll() {
    this.router.navigate(['dashboard']);
  }

  addInterests() {
    console.log("test");
  }

}
