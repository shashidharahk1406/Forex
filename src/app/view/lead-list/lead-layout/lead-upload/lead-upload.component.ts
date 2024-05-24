import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-upload',
  templateUrl: './lead-upload.component.html',
  styleUrls: ['./lead-upload.component.css']
})
export class LeadUploadComponent implements OnInit {
  uploadLeadForm!:FormGroup

  channelList:any = [];
  sourceList:any = [];
  priorityList:any = [];
  
  statusList:any = [];
 
  leadOwnerList:any = [];
  departmentList:any = [];
  courseList:any = [];
  countryList:any = [];
  stateList:any = [];
  
  selectedFiles: any;
  file!:File;
  formData:any;
  inputEl: any;
  referTo: any = [];
  user_id:any;
  user_role:any;
  

  constructor(
    public dialogRef: MatDialogRef<LeadUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _addLeadEmitter:AddLeadEmitterService,
    private commonService:CommonServiceService
   ){
    this.user_id = localStorage.getItem('user_id')
    this.user_role = localStorage.getItem('user_role')?.toUpperCase()
    this.dropDownValues()
   }

    ngOnInit(): void {
      this.initForm();

    }
    dropDownValues(){
      this.getCounselor();
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
        this.referTo = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }
   
   
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length) {
        this.file = event.target.files[0];
       ////console.log(this.file)
      // You can also update your form control if needed
      this.uploadLeadForm.get('leadUpload')?.setValue(this.file);
      }
    }
    
    initForm(){
      this.uploadLeadForm = this.fb.group({
       //step-1     
      referedTo:['',Validators.required], 
      leadUpload:['',[Validators.required,Validators.pattern(this.commonService.execlPattern)]]
      });
    }
    selectFile(event:any) {
      this.selectedFiles = event.target.files;
    }
    get f() {
      return this.uploadLeadForm.controls;
    }
    clearSelectField(fieldName: string) {
        this.uploadLeadForm.get(fieldName)?.reset();
      }
    closePopup(){
      this.dialogRef.close()
    }
    onSubmit(){  
       let f = this.uploadLeadForm.value
       const selected_counsellor_id = f.referedTo
       this.formData = new FormData();
        if(this.uploadLeadForm.invalid){
        this.uploadLeadForm.markAllAsTouched();
        }else{
          if (this.file) {
            this.formData.set('sample_file',this.file);
            this.formData.set('counsellor_ids',JSON.stringify(selected_counsellor_id))
            this.formData.set('created_by',this.user_id);
            
              this._baseService.postFile(`${environment.lead_upload}`,this.formData).subscribe((res:any)=>{
                if(res){
                  this.api.showSuccess(res.message)
                  this.dialogRef.close();
                  this._addLeadEmitter.triggerGet();
                 
                }
              },((error:any)=>{
                 this.api.showError(this.api.toTitleCase(error.error.error))
              }))
            } 
         
        }
      
    }
    
}
