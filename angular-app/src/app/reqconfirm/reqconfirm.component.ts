import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-reqconfirm',
  templateUrl: './reqconfirm.component.html',
  styleUrls: ['./reqconfirm.component.css']
})
export class ReqconfirmComponent implements OnInit {
  user;
  partners;
  constructor(private _userService: UserService, private _partnerService: PartnerService) { }

  ngOnInit() {
    this._userService.users.subscribe(
      (user) => { this.user = user;
        console.log(this.user.requests);
        this._partnerService.getRequestors({requests: this.user.requests});
      }
    );

    this._partnerService.partner.subscribe(
      (partners) => {this.partners = partners}
    );
  
  }

  linkAccounts(){
    console.log("hit link");
  }

  removeRequest(){
    console.log("hit remove")
  }

  
}
