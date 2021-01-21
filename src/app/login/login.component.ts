import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({

  // tslint:disable-next-line: component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val = {
    email: 'help@angular.io',
    password: '123pass'
  };

  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
  }
}
