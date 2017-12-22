import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PartnerService } from '../partner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reqconfirm',
  templateUrl: './reqconfirm.component.html',
  styleUrls: ['./reqconfirm.component.css']
})

export class ReqconfirmComponent implements OnInit {
  user;
  partners;
  constructor(private _userService: UserService, private _partnerService: PartnerService, private _router: Router) { }

  ngOnInit() {
    this.user = this._userService.getSessionUser();
    if (this.user){
      console.log(this.user.firstName);
      this._partnerService.getRequestors({requests: this.user.requests});
    }
    
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

  linkAccounts(idx){

    var link = {
      accept_id: this.user._id,
      request_id: this.partners[idx]._id
    }

    this._userService.addPartner(link);
    this._partnerService.getRequestors({requests: this.user.requests});
    this._router.navigateByUrl("dashboard");
  
  }

  removeRequest(idx){
    console.log("hit remove")
  }

}
