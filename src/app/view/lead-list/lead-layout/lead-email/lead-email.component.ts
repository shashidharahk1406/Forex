import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-lead-email',
  templateUrl: './lead-email.component.html',
  styleUrls: ['./lead-email.component.css'],
 
})
export class LeadEmailComponent implements OnInit {
 @Input()selectedId:any;
  emailForm!: FormGroup;
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService) {}

  ngOnInit(): void {
    this.initForm();
  }
 
  initForm(){
    this.emailForm = this.fb.group({
      // primaryMobile: [false],
      // fathersMobile: [false],
      // mothersMobile: [false],
      // alternateMobile: [false],
      emailTemplate: [''],
      subject: ['', Validators.required],
    });
  }
  get f() {
    return this.emailForm.controls;
  }

  clearSelectField(fieldName: string) {
    this.emailForm.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched()
      this.api.showError("Invalid Form")
    }
    else{
      const fd = this.emailForm.value;
      let emailFormVal:any = {}
      if(this.data.checked){
         emailFormVal ={
          all_users: true, 
          subject: fd.subject,
          message: fd.emailTemplate
         }
      }else{
        if(this.data.bulkIds?.length > 0 ){
           emailFormVal ={
            lead_list_ids: this.data.bulkIds, 
            subject: fd.subject,
            message: fd.emailTemplate
           }
        }else{
           emailFormVal ={
            lead_list_ids: [this.data.selectedData.id], 
            subject: fd.subject,
            message: fd.emailTemplate
           }
        }
        
      }
      
      this._baseService.postData(environment.lead_email,emailFormVal).subscribe((res:any)=>{
        if(res){
          this._bottomSheetRef.dismiss()
          this.api.showSuccess(res.message)
          
        }
      },((error)=>{
        this.api.showError(error.error.error.message)
      }))
    }
    
    
   
  }
  closePopup(){
    this._bottomSheetRef.dismiss() 
  }
}
