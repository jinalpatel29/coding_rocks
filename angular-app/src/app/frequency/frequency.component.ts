import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PartnerService } from '../partner.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
  user;
  partner;
  freq_arr: any[] = []
  constructor(private _userService: UserService, private _partnerService: PartnerService, private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.user = this._userService.getSessionUser();
    this._partnerService.getPartnerInfo({ id: this.user._partner });


    this._partnerService.partner.subscribe(
      (data) => {
        this.partner = data;
        if (this.partner.interests) {
          var main_obj = {};
          for (var interest of this.partner.interests) {
            main_obj = {
              name: interest.name,
              subcategories: []
            }
            var new_obj = {};
            for (var subcategory of interest.subcategories) {
              new_obj = {
                frequency: 0,
                per: ''
              }
              main_obj['subcategories'].push(new_obj);
            };

            this.freq_arr.push(main_obj);
          }

        }
      }
    )
  }

  saveFrequency() {
    for (var i in this.partner.interests) {
      for (var j in this.partner.interests[i].subcategories) {
        if (this.freq_arr[i].subcategories[j].per == "Day") {
          this.partner.interests[i].subcategories[j].interval = this.freq_arr[i].subcategories[j].frequency;
        } else if (this.freq_arr[i].subcategories[j].per == "Week") {
          this.partner.interests[i].subcategories[j].interval = 7 / this.freq_arr[i].subcategories[j].frequency
        } else if (this.freq_arr[i].subcategories[j].per == "Month") {
          this.partner.interests[i].subcategories[j].interval = 30 / this.freq_arr[i].subcategories[j].frequency
        }
      }
    }

    var new_arr = this.partner.interests;

    var interests_obj = {
      user_id: this.user._partner,
      result: new_arr
    }

    this._dataService.addInterests(interests_obj);
    this._router.navigateByUrl('dashboard');

  }

  logout() {
    this._userService.logout();
  }

}
