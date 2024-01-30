import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-lead',
  templateUrl: './add-new-lead.component.html',
  styleUrls: ['./add-new-lead.component.css']
})
export class AddNewLeadComponent implements OnInit {
  addNewLead!: FormGroup;
  basicLeadDeatails!:FormGroup;
  additionalInformation!:FormGroup;
  step: number = 0;
  countryOptions: any = [];
  stateOptions: any = [];
  channels: any = [];
  cityOptions: any = [];
  campaignOptions: any = [];
  leadStatus:any = [];
  studentEducation!: FormGroup;
  entranceExam!: FormGroup;
  studentDetails!: FormGroup;
  referredTo: any = [];
  studentStudyDetails!: FormGroup;
  adminList:any = [];
  leadSources: any = [];
  @Output() addLead = new EventEmitter()
  courseOptions: any = [];
  showOtherInput: boolean = false;
  zone:string[] = ['South','North', 'East', 'West'];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _commonService:CommonServiceService,
    private fb:FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _datePipe:DatePipe,
    private _addLeadEmitter:AddLeadEmitterService
    ) { 
      this.dropDownValues()
    }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    
      this.basicLeadDeatails = this.fb.group({
        firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
        mobile: ['', [Validators.required, Validators.pattern(this._commonService.mobilePattern)]],
        alternateNumber:['',[Validators.pattern(this._commonService.mobilePattern)]],
        email: ['', [Validators.email]],
        dateOfBirth:[''],
        state: [''],
        zone:[''],
        cityName: [''],
        pincode:['',[Validators.max(6)]],
        countryId:[''],
      })
    
      this.additionalInformation = this.fb.group({
        referenceName:[''],
        referencePhoneNumber:[''],
        fatherName:[''],
        fatherOccupation:[''],
        fatherPhoneNumber:['',Validators.pattern(this._commonService.mobilePattern)]
      })
     
      this.studentEducation = this.fb.group({
        tenthPercentage :[''],
        twelthPercentage :[''],
        degree:['']
      })
      this.studentStudyDetails = this.fb.group({
        course:[''],
        otherCourse:[''],
        entranceExam:[''],
        courseLookingfor:[''],
        preferredCollege1:[''],
        preferredCollege2:[''],
        preferredLocation1:[''],
        preferredLocation2:[''],
      })
      this.studentDetails = this.fb.group({
        counsellor:[''],
        counsellorAdmin:[''],
        leadSource:[''],
        leadStatus:[''],
        notes:[''],
        remarks:['']
      })
  }
  setStep(index: number) {
    this.step = index;
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
  }
  get f() {
    return this.basicLeadDeatails.controls;
  }
  onCourseSelectionChange(event:any) {
    if(event.target.value){
      this.showOtherInput = !this.showOtherInput
    }
  }
  dropDownValues(){
    this.getCountry();
    this.getState();
    this.getChannel();
    this.getSource();
    this.getCity();
    this.getCounselor();
    this.getStatus();
    this.getCourse();
  }
  getCountry(){
    this.api.getAllCountry().subscribe((res:any)=>{
      if(res.results){
      this.countryOptions = res.results
      console.log(res)
      }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getState(){
    this.api.getAllState().subscribe((res:any)=>{
      if(res.results){
        this.stateOptions = res.results
        console.log(res)
      }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getChannel(){
    this.api.getAllChannel().subscribe((resp:any)=>{
      if(resp.results){
        this.channels= resp.results;
        console.log(this.channels,"this.newChannelOptions")
      }
      else{
        this.api.showError('ERROR')
      }  
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    }

    )
  }
  getSource(){
    this.api.getAllSource().subscribe((res:any)=>{
     if(res.results){
      this.leadSources = res.results
     }
     else{
      this.api.showError('ERROR')
     }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getCity(){
    this.api.getAllCity().subscribe((res:any)=>{
      if(res.results){
        this.cityOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
  }
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.campaignOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
  }
  getCounselor(){
    this._baseService.getData(`${environment._user}/?role_name=counsellor`).subscribe((res:any)=>{
      if(res.results){
      this.referredTo = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
  getStatus(){
    this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
     if(res.results){
       this.leadStatus = res.results;
     }
    },(error:any)=>{
      this.api.showError(this.api.toTitleCase(error.error.message))
    })
   }
   getCourse(){
    this.api.getAllCourse().subscribe((res:any)=>{
      if(res.results){
        this.courseOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
   
  }
  clearSelectField(fieldName: string) {
    this.addNewLead.get(fieldName)?.reset();
}
onSubmit(){
  let f = this.addNewLead.value
 
   let data:any ={
    user_data: {
        first_name: f.firstName,
        last_name: f.lastName,
        email: f.email,
        mobile_number: f.mobile,
        role:5
    },

    higest_qualification: f.highestQualification,
    campaign_name:f.campaignName,
    season_id:f.season,
    channel_id:f.channel,
    source_id:f.source,
    priority_id:f.priority,
    refered_to_id:f.referredTo,
    lead_list_status_id:f.status,
    lead_list_substatus_id:f.subStatus,
    department_id:f.department,
    date_of_birth:this._datePipe.transform(f.dateOfBirth,'YYYY-MM-dd'),
    course_id:f.course,
    location: f.location,
    year_of_passing:f.yearOfPassing,
    best_time_to_call:f.callTime,
    country_id:f.countryId,
    state_id:f.state,
    city_id:f.cityName,
    role_id:5,
    new_channel_id:f.newChannel,
    campaign_id:f.campaign,
    medium_id:f.medium,
    level_of_program_id:f.levelOfProgram,
   
    lead_contact:{
      alternate_phone_number:f.alternateNumber,
      primary_phone_number: f.primaryNumber,
      father_phone_number:f.fathersNumber,
      mother_phone_number:f.mothersNumber,
      alternate_email:f.alternateEmail,
      primary_email:f.primaryEmail,
      father_email:f.fathersEmail,
      mother_email:f.mothersEmail
  }
   }
  if(this.addNewLead.invalid){
    this.addNewLead.markAllAsTouched()
    
  }
  else{
    this._baseService.postData(environment.lead_list,data).subscribe((res:any)=>{
      if(res){
        this.addLead.emit('ADD')
        this.api.showSuccess(res.message)
        this._bottomSheetRef.dismiss('yes');
        this._addLeadEmitter.triggerGet();
      }
    },(error=>{
      this.api.showError(error?.error.message)
    }))
  }
}
}
