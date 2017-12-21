import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})

export class InviteComponent implements OnInit {
  email = {email:""};
  user;
  constructor(config: NgbDropdownConfig, private _service: DataService, private _userService: UserService) {
    // config.placement = 'top-left';
    config.autoClose = false;
  }

  onSubmit(formdata) {
    this._service.invite(this.email).subscribe(
      (result) => { 
        if(result['status'] == "success"){
          formdata.reset();
        }
      }
    );
  }

  ngOnInit() {
    this._userService.users.subscribe(
      (data) => { this.user = data }
    );
  }
}