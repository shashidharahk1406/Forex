import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css'],
})
export class LeadEditComponent implements OnInit {
  step: number = 0;
  countryOptions: any = [];
  stateOptions: any = [];
  channels: any = [];
  cityOptions: any = [];
  campaignOptions: any = [];
  leadStatus:any = [];
  
  referredTo: any = [];
  
  adminList:any = [];
  leadSources: any = [];
  @Output() addLead = new EventEmitter()
  courseOptions: any = [];
  showOtherInput: boolean = false;
  zone:string[] = ['South','North', 'East', 'West'];
  leadStage:any = [];
  editLeadForm!:FormGroup;
  leadData: any = [];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _commonService:CommonServiceService,
    private fb:FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _datePipe:DatePipe,
    private _addLeadEmitter:AddLeadEmitterService,
    ) { 
      this.dropDownValues()
    }

  ngOnInit(): void {
    this.initForm()
    this.getLeadById()
  }
  getLeadById() {
    this._baseService.getByID(`${environment.lead_list}${this.data.user_data.id}/`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.length > 0) {
          const lead = res.result[0];
          this.editLeadForm.patchValue({
            firstName: lead.user_data.first_name,
            mobile: lead.user_data.mobile_number,
            alternateNumber: lead.alternate_mobile_number,
            email: lead.user_data.email,
            dateOfBirth: lead.date_of_birth,
            state: lead.state,
            zone: lead.zone,
            course:lead.course,
            cityName: lead.city,
            pincode: lead.pincode,
            countryId: lead.country,
            referenceName: lead.reference_name,
            referencePhoneNumber: lead.reference_mobile_number,
            fatherName: lead.father_name,
            fatherOccupation: lead.father_occupation,
            fatherPhoneNumber: lead.father_mobile_number,
            tenthPercentage: lead.tenth_per,
            twelthPercentage: lead.twelfth_per,
            degree: lead.degree_per,
            otherCourse: lead.others,
            entranceExam: lead.enterance_exam,
            courseLookingfor: lead.course_looking_for,
            preferredCollege1: lead.preferred_college1,
            preferredCollege2: lead.preferred_college2,
            preferredLocation1: lead.preferred_location1,
            preferredLocation2: lead.preferred_location2,
            counsellor: lead.referred_to,
            counsellorAdmin: lead.counselled_by,
            leadSource: lead.source,
            leadStages: lead.lead_stage,
            leadStatus: lead.lead_list_status,
            notes: lead.notes,
            remarks: lead.remark
          });
        }
      },
      (error) => {
        this.api.showError(error.error.message);
      }
    );
  }
  
  initForm(){
      this.editLeadForm = this.fb.group({
        firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
        mobile: ['', [Validators.required, Validators.pattern(this._commonService.mobilePattern)]],
        alternateNumber:['',[Validators.pattern(this._commonService.mobilePattern)]],
        email: ['', [Validators.email]],
        dateOfBirth:"",
        state: [''],
        zone:[''],
        cityName: [''],
        pincode:[''],
        countryId:[''],
        referenceName:[''],
        referencePhoneNumber:['',Validators.pattern(this._commonService.mobilePattern)],
        fatherName:[''],
        fatherOccupation:[''],
        fatherPhoneNumber:['',Validators.pattern(this._commonService.mobilePattern)],
        tenthPercentage :[''],
        twelthPercentage :[''],
        degree:[''],
        course:[''],
        otherCourse:[''],
        entranceExam:[''],
        courseLookingfor:[''],
        preferredCollege1:[''],
        preferredCollege2:[''],
        preferredLocation1:[''],
        preferredLocation2:[''],
        counsellor:['',[Validators.required]],
        counsellorAdmin:[''],
        leadSource:['',[Validators.required]],
        leadStages:['',[Validators.required]],
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
    return this.editLeadForm.controls;
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
    this.getCounselledBy();
    this.getLeadStage();
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
    this._baseService.getData(`${environment._user}?role_name=counsellor`).subscribe((res:any)=>{
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
  getCounselledBy(){
    this._baseService.getData(`${environment._user}?role_name=Admin`).subscribe((res:any)=>{
      if(res.results){
      this.adminList = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
  getLeadStage(){
    this._baseService.getData(environment.leadStage).subscribe((res:any)=>{
     if(res){
      this.leadStage = res.results
     }
    },((error:any)=>{
     this.api.showError(error.error.message)
    }))
   }
  
  clearSelectField(fieldName: string) {
    this.editLeadForm.get(fieldName)?.reset();
   }
  
  
onSubmit(){
 
const formData = this.editLeadForm.value;
const data ={
  first_name: formData.firstName,
  last_name:"",
  email: formData.email,
  mobile_number: formData.mobile,
  date_of_birth: this._datePipe.transform(formData.dateOfBirth,'YYYY-MM-dd'),
  alternate_mobile_number: formData.alternateNumber,
  role: 5,
  location:  formData.cityName,
  pincode: formData.pincode,
  country: formData.countryId,
  state: formData.state, 
  city: formData.cityName, 
  zone: formData.zone,
  lead_list_status: formData.leadStatus,
  lead_list_substatus: 1,
  counselled_by: formData.counsellorAdmin,
  lead_stage: formData.leadStages,
  notes: formData.notes,
  remark: formData.remarks,
  source: formData.leadSource,
  refered_to: formData.referedTo,
  education_details: {
  tenth_per: formData.tenthPercentage,
  twelfth_per: formData.twelthPercentage,
  degree_per: formData.degree,
  stream: formData.course,
  others: formData.otherCourse,
  enterance_exam: formData.entranceExam,
  course_looking_for: formData.courseLookingfor,
    preferance_college_and_location: [
      {
        preferred_college1: formData.preferredCollege1,
        preferred_college2: formData.preferredCollege2,
        preferred_location1: formData.preferredLocation1,
        preferred_location2: formData.preferredLocation2
      }
    ],
  },
  additional_info: {
    reference_name: formData.referenceName,
    reference_mobile_number:formData.referencePhoneNumber,
    father_name: formData.fatherName,
    father_occupation: formData.fatherOccupation,
    father_mobile_number: formData.fatherPhoneNumber
  }
}

  if(this.editLeadForm.invalid){
    this.editLeadForm.markAllAsTouched()
    this.api.showError("Please Fill The Mandatory Fields")
  }
  else{
    this._baseService.updateData(`${environment.lead_list}${this.data.user_data.id}/`,data).subscribe((res:any)=>{
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
