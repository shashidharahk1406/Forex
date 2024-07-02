import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-refer-lead',
  templateUrl: './customer-refer-lead.component.html',
  styleUrls: ['./customer-refer-lead.component.css']
})
export class CustomerReferLeadComponent implements OnInit {

  referLeadForm!:FormGroup;
  referTo: any = [];
  selectedCounselor: any;
  selectedCounsellor: any;
  currentCounsellor: any;
  previousValues: any = [];
  user_id: any;
  user_role:any;
  counsellorLastname: any;
  @Output()refresh = new EventEmitter()
  constructor(
    public dialogRef: MatDialogRef<CustomerReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _addLeadEmitter:AddLeadEmitterService,private dataService:DataService) {
      this.user_id = localStorage.getItem('user_id')
      this.user_role = localStorage.getItem('user_role')?.toUpperCase();
      this.initForm()
     
     }
    
    get f() {
      return this.referLeadForm.controls;
    }
    getReferLead() {
      let params = this.data.leadId ? this.data.leadId : this.data;
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
        lead_list: [this.data],
        counsellor_ids: [f.referTo],
        comment:f.comment
       }
     }
       this._baseService.postData(`${environment.lead_refer}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          if(this.isFiltered==true){
            this.refresh.emit(false)
          }
          else{
            this._addLeadEmitter.customerFiltertriggerGet();
            this.refresh.emit(true)
          }
          
          
          this.dialogRef.close(true)

          
         
          
        }
       },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
       }))
      }
      
    }
    isFiltered:any
    
    ngOnInit(): void {
      this.getReferLead()
      this.getCounselor()

      this.dataService.filterCustomerRefreshdataSubject.subscribe((res: any) => {
        console.log(res, 'filter');
  
        this.isFiltered = res;
      });
    }
   
    initForm(){
      this.referLeadForm = this._fb.group({
        referTo:['',Validators.required],
        comment:['',Validators.required]
      })
    }
    close(){
      this.dialogRef.close(false)
    }

}
