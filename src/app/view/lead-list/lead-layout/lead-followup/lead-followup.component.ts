import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-followup',
  templateUrl: './lead-followup.component.html',
  styleUrls: ['./lead-followup.component.css'],
 
})
export class LeadFollowupComponent implements OnInit {

  meridian = true;
  followupForm!: FormGroup;
  leadCategory:any = [];
  status:any = [];
  subStatus:any = [];
  followupType:any = [];
  templateList:any = [];
  basicTemplate: any;
 
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService) {}

  ngOnInit(): void {
    this.dropDownValues()
    this.initForm()
  }

 initForm(){
  this.followupForm = this.fb.group({
    leadCategory:['',Validators.required],
    status:['',Validators.required],
    subStatus:['',Validators.required],
    followupType:['',Validators.required],
    nextActionDate:['',Validators.required],
    // nextActionTime:['',Validators.required],
    followupComment:['',Validators.required],
    template:['',Validators.required],
    editableText:['']
  })
 }
 dropDownValues(){
  this.getSource()
  this.getStatus()
  this.getSubStatus()
  this.getChannel()
  this.getTemplate()
 }
 getSource(){
  this.api.getAllSource().subscribe((res:any)=>{
   if(res.results){
    this.leadCategory = res.results
   }
   else{
    this.api.showError('ERROR')
   }
  },(error:any)=>{
    this.api.showError(error.error.message)
    
  })
}
getStatus(){
  this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
   if(res.results){
     this.status = res.results;
   }
  },(error:any)=>{
   this.api.showError(error.error.message)
  })
 }
 getSubStatus(){
   this._baseService.getData(`${environment.lead_subStatus}`).subscribe((res:any)=>{
     if(res.results){
       this.subStatus = res.results;
     }
    },(error:any)=>{
     this.api.showError(error.error.message)
    })
 }
 getChannel(){
  this.api.getAllChannel().subscribe((resp:any)=>{
    if(resp.results){
      this.followupType= resp.results;
    }
    else{
      this.api.showError('ERROR')
    }  
  },(error:any)=>{
    this.api.showError(error.error.message)
    
  }

  )
}
getTemplate(){
  this._baseService.getData(`${environment.whatsapp_template}`).subscribe((res:any)=>{
    if(res.results){
      this.templateList = res.results
    }
  })
}
 closePopup(){
  this._bottomSheetRef.dismiss()
}
  
get f() {
  return this.followupForm.controls;
}
clearSelectField(fieldName: string) {
  this.followupForm.get(fieldName)?.reset();
}
onSubmit(){
  if(this.followupForm.invalid){
    this.followupForm.markAllAsTouched()
  }else{
    const fd= this.followupForm.value
    let data = {
      lead_category:fd.leadCategory,
      lead_status: fd.status,
      lead_sub_status: fd.subStatus,
      follow_up_type: fd.followupType,
      tempplate: fd.template,
      action_date_time: fd.nextActionDate,
      follow_up_text: fd.followupComment
  }
  this._baseService.postData(`${environment.lead_follow_up}`,data).subscribe((res:any)=>{
    if(res){
      this.api.showSuccess(res.message)
    }
  },((error:any)=>{
    this.api.showError(error.error.message)
  }))
  }
}
selectOptionsProgrammatically() {
  const selectedValues = ['Application','Lead'];
  this.followupForm.patchValue({
    leadCategory:selectedValues
  })
}
onChanges(item:any,template:any){
  this.basicTemplate = '';
 if(template && item){
   if(item.id === template){
    this.basicTemplate = `#Hi# ${item.message} #first_name#`
    // Check if the followupComment contains hash symbols (#)
    // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
    // const modifiedValue =  this.basicTemplate.replace(/#(.*?)#/g, (match: any, content: any) => {
    //   return `<span class="non-editable" contenteditable="false">${match}</span>`;
    // });
    this.followupForm.patchValue({
      followupComment:this.basicTemplate
    })
   
  
  }
 }
}
onInput(event: any) {
  const textarea = event.target;
  const value = textarea.value;

  // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
  // const modifiedValue = value.replace(/#(.*?)#/g, (match: any, content: any) => {

  //   return `<span class="non-editable" >${match}</span>`;
  // });
 //console.log(modifiedValue,"debugger")
  // this.followupForm.patchValue({
  //   followupComment: modifiedValue
  // });
  
}



}
