import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hidePassword = true;
  loginForm!:FormGroup;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  constructor(private _fb:FormBuilder,
    private commonService:CommonServiceService,
	private router:Router){}
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.loginForm = this._fb.group({
      userName:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,this.commonService.passwordValidator()]]
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  
  goToForgotPassword(){}

}
