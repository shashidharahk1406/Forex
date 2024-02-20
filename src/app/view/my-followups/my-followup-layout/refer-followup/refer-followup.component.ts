import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refer-followup',
  templateUrl: './refer-followup.component.html',
  styleUrls: ['./refer-followup.component.css']
})
export class ReferFollowupComponent implements OnInit {

  referLeadFollowUpForm!:FormGroup;
  referTo: any = [];
  constructor(
    public dialogRef: MatDialogRef<ReferFollowupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _bottomSheetRef: MatBottomSheetRef<any>) { }
    
    get f() {
      return this.referLeadFollowUpForm.controls;
    }
    getCounselor(){
      this._baseService.getData(`${environment._user}/?role_name=counsellor`).subscribe((res:any)=>{
        if(res.results){
        this.referTo = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }
    clearSelectField(fieldName: string) {
      this.referLeadFollowUpForm.get(fieldName)?.reset();
    }
  
    onSubmit() {
      if (this.referLeadFollowUpForm.invalid) {
        this.referLeadFollowUpForm.markAllAsTouched()
      }
      else{
        let formData:any = {}
      const f = this.referLeadFollowUpForm.value;
      if(this.data.leadId){
        formData= {
          lead_list: this.data.leadId,
          counsellor_ids: f.referTo,
          comment:f.comment
         }
      }
     else{
      formData= {
        lead_list: [this.data],
        counsellor_ids: [f.referTo],
        comment:f.comment
       }
     }
       this._baseService.postData(`${environment.lead_refer}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this.dialogRef.close()
        }
       },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
       }))
      }
      
    }
    
    ngOnInit(): void {
      this.getCounselor()
      this.initForm()
    }
    initForm(){
      this.referLeadFollowUpForm = this._fb.group({
        referTo:['',Validators.required],
        comment:['',Validators.required]
      })
    }
    

}
