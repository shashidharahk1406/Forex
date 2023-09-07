import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPasswordEye:Boolean = true;
  confirmPasswordEye:Boolean = true
  colorControl =  new FormControl('appColor' as ThemePalette);
  
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) {
  }
  
  resetLinkForm!:FormGroup;
  newPassword!:FormGroup;
  ngOnInit(): void {
    this.initNewPassword()
    this.initResetLink()
  }
  initResetLink(){
    this.resetLinkForm = this._fb.group({
      email:[true,[Validators.required]],
      sms:['']
    })
  }
  initNewPassword(){
    this.newPassword = this._fb.group({
      newPassword:[''],
      confirmPassword:[''],
      newPasswordEmail:[''],
      newPasswordSms:[''],
      mandatoryPassword:['']
    })
    
  }
  get rsForm(){
    return this.resetLinkForm.controls
  }
  resetLink(){
    if(this.resetLinkForm.invalid){
      this.resetLinkForm.markAllAsTouched()
    }
    else{
      console.log(this.resetLinkForm.value,"VALUE_________________")
    }
  }
}
