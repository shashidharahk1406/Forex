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
  editLead!: FormGroup;
  leadCategory:any = [];
  status:any = [];
  subStatus:any = [];
  followupType:any = [];
  templateList:any = [
    {
      id:1,
      template:'dummy1'
    },
    {
      id:2,
      template:'dummy2'
    }
  ]
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
  this.editLead = this.fb.group({
    leadCategory:['',Validators.required],
    status:['',Validators.required],
    subStatus:['',Validators.required],
    followupType:['',Validators.required],
    nextActionDate:['',Validators.required],
    nextActionTime:['',Validators.required],
    followupComment:['',Validators.required],
    template:['',Validators.required]
  })
 }
 dropDownValues(){
  this.getSource()
  this.getStatus()
  this.getSubStatus()
  this.getChannel()
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
 closePopup(){
  this._bottomSheetRef.dismiss()
}
  
get f() {
  return this.editLead.controls;
}
clearSelectField(fieldName: string) {
  this.editLead.get(fieldName)?.reset();
}
onSubmit(){
  if(this.editLead.invalid){
    this.editLead.markAllAsTouched()
  }
}
selectOptionsProgrammatically() {
  const selectedValues = ['Application','Lead'];
  this.editLead.patchValue({
    leadCategory:selectedValues
  })
}

}
