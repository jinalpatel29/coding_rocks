import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name;
  title = 'Registration';
  user = new User();
  success = false;
  info = { email: "",pwd:""}
  loginRes;

  constructor(private _service: DataService, private _uservice: UserService, private router: Router) { }

  signUp(formdata) {
    console.log(this.user);
    this._uservice.register(this.user);   
    formdata.reset();
    this.user = new User();
  }
  login(info) {
    console.log("in login")
    console.log(info)  
    this.loginRes = this._uservice.login(info);      
    this.router.navigate(['/quiz']);   
  }
  ngOnInit() {
  }

}
