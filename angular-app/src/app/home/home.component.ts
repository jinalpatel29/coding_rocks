import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

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
  newUser = {};

  constructor(private _service: DataService, private router: Router) { }

  signUp() {
    console.log(this.user);
    this.newUser = this.user;
    this.success = true;
    this.user = new User();
  }
  onSubmit(name) {
    console.log("in ")
    console.log(name)
    this._service.createUser(name);
    this.router.navigate(['/quiz']);
  }

  ngOnInit() {
  }

}
