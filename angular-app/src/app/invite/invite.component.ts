import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})

export class InviteComponent implements OnInit {
  email = {email:""};
  user;
  partner = null;
  partner_email;
  found_user;
  partner_match: boolean = null
  constructor(config: NgbDropdownConfig, private _userService: UserService, private _partnerService: PartnerService, private _dataService: DataService) {
    config.autoClose = false;
  }

  onSubmit(formdata) {
    this._dataService.invite(this.email).subscribe(
      (result) => { 
        if(result['status'] == "success"){
          formdata.reset();
        }
      }
    );
  }

  ngOnInit() {
    this.user = this._userService.getSessionUser();
    console.log("in invite user is:"+this.user)

    if ( !this._userService.isLoggedIn()) {
      this._userService.logout();
    }

    this._partnerService.partner.subscribe(
      (data) => { this.partner = data }
    )
  }

  findPartner(){
    this.found_user = this.partner_email;
    var find_user = {
      email: this.partner_email
    }
    this._partnerService.getPartner(find_user);
    this.partner_match = true;
  }

  request(){
    var new_request = {
      partner_id: this.partner._id,
      user_id: this.user._id,
    }
    this._dataService.addRequest(new_request);
  }

}