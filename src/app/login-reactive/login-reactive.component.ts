import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createPasswordStrengthValidatorFn } from '../validators/password-strength-validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  //The below example in comment is using the formgroup, form controls in traditional way

  // email = new FormControl('',
  //   {
  //     validators: [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(20)],
  //     updateOn: 'blur'
  //   });
  // password = new FormControl('',
  //   { validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidatorFn() ]
  //   });

  // form = new FormGroup({
  //   email: this.email,
  //   password: this.password
  // });

  // The below example is using Form builder

  form = this.fb.group( {
    email: ['', {
        Validators: [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(20)],
        updateOn: 'blur'
    }],
    password: ['' , [Validators.required, Validators.minLength(8), createPasswordStrengthValidatorFn() ] ]
  });

  constructor(private fb: FormBuilder) {


  }

  ngOnInit() {

  }

  get email(){
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

}
