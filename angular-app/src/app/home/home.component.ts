import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name;
  constructor(private _service:DataService, private router:Router) { }
  
  onSubmit(name){
    console.log("in ")
    console.log(name)
    this._service.createUser(name);
    this.router.navigate(['/quiz']);
  }

  ngOnInit() {
  }

}
