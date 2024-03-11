import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
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
  selectedCounselor: any;
  selectedCounsellor: any;
  currentCounsellor: any;
  previousValues: any = [];
  constructor(
    public dialogRef: MatDialogRef<ReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService) {
      this.initForm()
      this.getCounselor()
      this.getReferLead()
     }
    
    get f() {
      return this.referLeadForm.controls;
    }
    getReferLead() {
      let params = this.data.leadId ? this.data.leadId : this.data;
      let selectedObject:any;
      if(!this.data.leadId){
        this._baseService.getByID(`${environment.lead_refer}?lead_id=${params}`).subscribe((res: any) => {
          if (res) {
            let formVal = res.result[0][0];
            this.previousValues = res.result[0][0]
            this.referLeadForm.patchValue({
              referTo: formVal.counsellor,
              comment: formVal.comment
            });
            
            if (selectedObject) {
              this.selectedCounsellor = selectedObject.first_name;
            }
          }
        }, (error: any) => {
          this.api.showError(error.error.message);
        });
      }
     
     
    }
    
    getCounselor(){
      this._baseService.getData(`${environment._user}/?role_name=counsellor`).subscribe((res:any)=>{
        if(res.results){
        this.referTo = res.results
          let selectedObject = this.referTo.find((obj: any) => obj.id === this.previousValues.counsellor);
          this.currentCounsellor = selectedObject.first_name
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
      return this.referTo;
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
      let referTo:any;
     if(f.referTo.length >2) {
      referTo = [f.referTo]
     } else{
      referTo = f.referTo
     }
      formData= {
        lead_list: [this.data],
        counsellor_ids: referTo,
        comment:f.comment
       }
     }
       this._baseService.postData(`${environment.lead_refer}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this._addLeadEmitter.triggerGet();
          this.dialogRef.close()
        }
       },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
       }))
      }
      
    }
    
    ngOnInit(): void {}
    initForm(){
      this.referLeadForm = this._fb.group({
        referTo:['',Validators.required],
        comment:['',Validators.required]
      })
    }
    close(){
      this.dialogRef.close()
    }
}
