import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  user;
  constructor(config: NgbDropdownConfig, private _userService: UserService) {
    // config.placement = 'top-left';
    config.autoClose = false;
  }

  ngOnInit() {
    this._userService.users.subscribe(
      (data) => { this.user = data }
    );

  }
}