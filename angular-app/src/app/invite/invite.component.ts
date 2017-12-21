import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  email;
  constructor(private _service:DataService) { }
  onSubmit(){
    this._service.invite(this.email);
  }
  ngOnInit() {
  }

}
