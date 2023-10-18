import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css'],
})
export class LeadEditComponent implements OnInit {
  isOpen = false;
  meridian = true;
  editLead!: FormGroup;
  genderList = ['Female','Male','Others'];
  programList:any = [];
  department:any = []
  stat_us: any = [];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private _baseService:BaseServiceService,
    private _commonService:CommonServiceService,
    private api:ApiService,
    private _datePipe:DatePipe) {
      this.getLevelOfProgram()
      this.getDepartment()
      this.getStatus()
    }

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
    this.patchFormValue()
  }
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((res:any)=>{
      if(res.results){
        this.programList = res.results 
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
    })
  }
  getDepartment(){
    this.api.getAllDepartment().subscribe((res:any)=>{
      if(res.results){
        this.department = res.results;
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
       this.stat_us = res.results;
     }
    },(error:any)=>{
     this.api.showError(error.error.message)
    })
   }
 initForm(){
  this.editLead = this.fb.group({
   firstName:['',[Validators.required,Validators.pattern(this._commonService.namePattern)]],
   lastName:['',[Validators.required,Validators.pattern(this._commonService.namePattern)]],
   email:['',[Validators.required,Validators.email]],
   mobileNumber:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
   dateOfBirth:[''],
  //  gender:[''],
   alternateMobile:['',[Validators.pattern(this._commonService.mobilePattern)]],
   alternateEmail:['',[Validators.email]],
   levelOfProgram:['',Validators.required],
   department:['',Validators.required],
   status:['',Validators.required],
   
   highestQualification: [''],
    callTime:[''],
    campaignName: [''],
    season: [''],
    channel: [''],
    source: [''],
    priority: [''],
    referredTo: [''],
    subStatus:[''],
    course: [''],
    location: [''],
    yearOfPassing: [''],
    primaryNumber:[''],
    fathersNumber:[''],
    mothersNumber:[''],
    alternateNumber:[''],
    primaryEmail:[''],
    fathersEmail:[''],
    mothersEmail:[''],
    countryId: [''],
    state: [''],
    cityName: [''],
    newChannel: [''],
    campaign: [''],
    medium: [''],
  })
 }
 patchFormValue(){
  this.editLead.patchValue({
    firstName:this.data.user_data.first_name,
    lastName:this.data.user_data.last_name,
    email:this.data.user_data.email,
    mobileNumber:this.data.user_data.mobile_number,
    alternateMobile:this.data.alternate_phone_number,
    alternateEmail:this.data.alternate_email,
    levelOfProgram:this.data.level_of_program_id,
    department:this.data.department_id,
     
    highestQualification:this.data.higest_qualification,
    campaignName:this.data.campaign_name,
    season:this.data.season_id,
    channel:this.data.channel_id,
    source:this.data.source_id,
    priority:this.data.priority_id,
    referredTo:this.data.refered_to_id,
    status:this.data.lead_list_status_id,
    dateOfBirth:this.data.date_of_birth,
    course:this.data.course_id,
    location:this.data.location,
    yearOfPassing:this.data.year_of_passing,
    callTime:this.data.best_time_to_call,
    countryId:this.data.campaign_id,
    state:this.data.state_id,
    cityName:this.data.city_id,
    newChannel:this.data.new_channel_id,
    campaign:this.data.campaign_id,
    medium:this.data.medium_id,
      
    primaryNumber: this.data.primary_phone_number,
    fathersNumber:this.data.father_phone_number,
    mothersNumber:this.data.mother_phone_number,
    primaryEmail :this.data.primary_email,
    fathersEmail :this.data.father_email,
    mothersEmail :this.data.mother_email
   })
 }
 closePopup(){
  this._bottomSheetRef.dismiss()
  this.isOpen = !this.isOpen;
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
  else{
    let e = this.editLead.value
    let data = {
       user_data: {
          first_name: e.firstName,
          last_name: e.lastName,
          email: e.email,
          mobile_number: e.mobileNumber
      },
      higest_qualification: e.highestQualification,
      campaign_name:e.campaignName,
      season_id:e.season,
      channel_id:e.channel,
      source_id:e.source,
      priority_id:e.priority,
      refered_to_id:e.referredTo,
      lead_list_status_id:e.status,
      department_id:e.department,
      date_of_birth:this._datePipe.transform(e.dateOfBirth,'YYYY-MM-dd'),
      course_id:e.course,
      location: e.location,
      year_of_passing:e.yearOfPassing,
      best_time_to_call:e.callTime,
      country_id:e.countryId,
      state_id:e.state,
      city_id:e.cityName,
      new_channel_id:e.newChannel,
      campaign_id:e.campaign,
      medium_id:e.medium,
      level_of_program_id:e.levelOfProgram,
      alternate_phone_number:e.alternateNumber,
      primary_phone_number: e.primaryNumber,
      father_phone_number:e.fathersNumber,
      mother_phone_number:e.mothersNumber,
      alternate_email:e.alternateEmail,
      primary_email:e.primaryEmail,
      father_email:e.fathersEmail,
      mother_email:e.mothersEmail
  }
  this._baseService.updateData(`${environment.lead_list}${this.data.id}/`,data).subscribe((res:any)=>{
    if(res){
      this.api.showSuccess(res.message)
      this.close()
    }else{
      this.api.showError('Error')
    }
  },(error:any)=>{
    this.api.showError(error.error.error.message)
  })
 }
}
selectOptionsProgrammatically() {
  const selectedValues = ['Application','Lead'];
  this.editLead.patchValue({
    leadCategory:selectedValues
  })
}
close(){
  this._bottomSheetRef.dismiss()
  window.location.reload();
}
}
