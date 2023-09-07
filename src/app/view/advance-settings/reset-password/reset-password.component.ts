import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder
  ) { }
  resetLinkForm!:FormGroup;
  newPassword!:FormGroup;
  ngOnInit(): void {
    this.initNewPassword()
    this.initResetLink()
  }
  initResetLink(){
    this.resetLinkForm = this._fb.group({
      email:[''],
      sms:['']
    })
  }
  initNewPassword(){
    this.newPassword = this._fb.group({
      newPasswordEmail:[''],
      newPasswordSms:[''],
      mandatoryPassword:['']
    })
    
  }
}
