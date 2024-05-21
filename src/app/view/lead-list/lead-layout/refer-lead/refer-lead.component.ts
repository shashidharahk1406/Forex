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
  user_id: any;
  counsellorLastname: any;
  user_role: any;
  constructor(
    public dialogRef: MatDialogRef<ReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService) {
      this.user_id = localStorage.getItem('user_id')
      this.user_role = localStorage.getItem('user_role')?.toUpperCase();
      // console.log(data,"data in referlead componennt");
      

      this.initForm()
     
     }
    
    get f() {
      return this.referLeadForm.controls;
    }
    getReferLead() {
      let params = this.data.leadId ? this.data.leadId : this.data.id? this.data.id: this.data;
      //console.log(params,"params for bulk lead refer");
      
        this._baseService.getByID(`${environment.lead_refer}?lead_id=${params}`).subscribe((res: any) => {
          if (res) {
            let formVal = res.result[0][0];
            this.previousValues = res.result[0][0]
          
          }
        }, (error: any) => {
         // this.api.showError(error.error.message);
        });
    
     
    }
    
    getCounselor(){
      let query = ""
      const counsellorRoles = ['COUNSELLOR', 'COUNSELOR'];
        const superAdminRoles = ['SUPERADMIN', 'SUPER ADMIN'];
        const adminRoles = ['ADMIN'];
      
        if (counsellorRoles.includes(this.user_role)) {
         query = `?user_id=${this.user_id}`
        } else if (superAdminRoles.includes(this.user_role)) {
          query = ``
        } else if (adminRoles.includes(this.user_role)) {
          query = `?user_id=${this.user_id}`
        } 
      this._baseService.getData(`${environment._user}${query}`).subscribe((res:any)=>{
        if(res.results){
          let selectedObject = res.results.find((obj: any) => obj.id === this.previousValues?.counsellor);
          this.currentCounsellor = selectedObject?.first_name 
          this.counsellorLastname = selectedObject?.last_name
          this.referTo = res.results.filter((f:any)=>f.id != this.previousValues?.counsellor)
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
        let counselor = f.referTo.length > 0 ? f.referTo:[f.referTo]
        formData= {
          lead_list: this.data.leadId,
          counsellor_ids: counselor,
          comment:f.comment
         }
      }
     else{
      formData= {
        lead_list: [this.data.id? this.data.id:this.data],
        counsellor_ids: [f.referTo],
        comment:f.comment
       }
     }
       this._baseService.postData(`${environment.lead_refer}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this._addLeadEmitter.triggerGet();
          if(this.data.callback){
            this.data.callback();
          }
          
          this.dialogRef.close()
        }
       },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
       }))
      }
      
    }
    
    ngOnInit(): void {
      this.getReferLead()
      this.getCounselor()
    }
   
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
