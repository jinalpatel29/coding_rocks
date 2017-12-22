import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
  user;
  partner;
  constructor(private _userService: UserService, private _partnerService: PartnerService) { }

  ngOnInit() {
    this._userService
    this._userService.users.subscribe(
      (user) => {this.user = user});
  }

}
