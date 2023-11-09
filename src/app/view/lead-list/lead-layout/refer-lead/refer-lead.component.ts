import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refer-lead',
  templateUrl: './refer-lead.component.html',
  styleUrls: ['./refer-lead.component.css']
})
export class ReferLeadComponent implements OnInit {
  referLeadForm!:FormGroup;
  referTo: any = [];
  constructor(
    public dialogRef: MatDialogRef<ReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService) { }
    
    get f() {
      return this.referLeadForm.controls;
    }
    getCounselor(){
      this._baseService.getData(`${environment._user}/?role=counsellor`).subscribe((res:any)=>{
        if(res){
        this.referTo = res
        }
      },((error:any)=>{
        this.api.showError(error.error.message)
      }))
    }
    clearSelectField(fieldName: string) {
      this.referLeadForm.get(fieldName)?.reset();
    }
  
    onSubmit() {
      if (this.referLeadForm.invalid) {
        this.referLeadForm.markAllAsTouched()
      }
      else{
        let formData:any = {}
      const f = this.referLeadForm.value;
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
        this.api.showError(error.error.message)
       }))
      }
      
    }
    
    ngOnInit(): void {
      this.getCounselor()
      this.initForm()
    }
    initForm(){
      this.referLeadForm = this._fb.group({
        referTo:['',Validators.required],
        comment:['',Validators.required]
      })
    }
    
}
