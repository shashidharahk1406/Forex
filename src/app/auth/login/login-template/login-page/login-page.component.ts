import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
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
	private router:Router, private api:ApiService){}
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

  login(){
    if(this.loginForm.invalid){

    }
    else{
      this.api.login(this.loginForm.value).subscribe(
        (resp:any)=>{

        },
        (error:any)=>{

        }
      )
    }
  }

}
