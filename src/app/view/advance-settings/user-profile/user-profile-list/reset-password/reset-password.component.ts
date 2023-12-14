import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPasswordEye:Boolean = true;
  confirmPasswordEye:Boolean = true
  isChecked:boolean=true
  colorControl =  new FormControl('appColor' as ThemePalette);
  userData:any
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,private api:ApiService,private emit:EmitService) {
      console.log(data);
      this.userData=data
  }
  
  resetLinkForm!:FormGroup;
  newPassword!:FormGroup;
  ngOnInit(): void {
    // this.initNewPassword()
    this.initResetLink()
  }
  initResetLink(){
    this.resetLinkForm = this._fb.group({
      email:['',[Validators.required]],
     
    })
  }
  // initNewPassword(){
  //   this.newPassword = this._fb.group({
  //     newPassword:[''],
  //     confirmPassword:[''],
  //     newPasswordEmail:[''],
  //     newPasswordSms:[''],
  //     mandatoryPassword:['']
  //   })
    
  // }
  get rsForm(){
    return this.resetLinkForm.controls
  }
  resetLink(){
    this.resetLinkForm.patchValue({email:this.userData.userdata.email})
    if(this.resetLinkForm.invalid){
      this.resetLinkForm.markAllAsTouched()
    }
    else{
      this.api.sendResetLink(this.resetLinkForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.api.showSuccess(this.api.toTitleCase(resp.message))
          this.resetLinkForm.reset()
          this.dialogRef.close()
        },
        (error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
    }
  }
}
