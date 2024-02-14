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
  //leadStage:any = ['Data (Intital stage)','Qualified Lead','Walkin','Application','Payment','Document Verification', 'Admission','Droupout']
  addLeadForm!:FormGroup;
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
      this.addLeadForm = this.fb.group({
        firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
        mobile: ['', [Validators.required, Validators.pattern(this._commonService.mobilePattern)]],
        alternateNumber:['',[Validators.pattern(this._commonService.mobilePattern)]],
        email: ['', [Validators.email]],
        dateOfBirth:[''],
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
    return this.addLeadForm.controls;
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
    this.addLeadForm.get(fieldName)?.reset();
   }
  
  
onSubmit(){
  let f = this.addLeadForm.value
 
   let data:any ={
     user_data: {
        first_name: f['firstName'],
        last_name: "",
        email: f['email'] || null,
        mobile_number:f['mobile'],
        role: 5
    },
    date_of_birth:this._datePipe.transform(f['dateOfBirth'],'YYYY-MM-dd') || null,
    alternate_mobile_number:f['alternateNumber'] || null,
    additional_info:{
      reference_name:f['referenceName'],
      reference_mobile_number:f['referencePhoneNumber'] || null,
      father_name:f['fatherName'],
      father_occupation:f['fatherOccupation'],
      father_mobile_number:f['fatherPhoneNumber'] || null
    },
    
    user_location: {
        location: 'NA',
        pincode: f['pincode'] || null,
        country:f['countryId'],
        state: f['state'],
        city: f['cityName'],
        zone:f['zone']
    },
    education_details: {
        tenth_per: f['tenthPercentage'] || null,
        twelfth_per: f['twelthPercentage'] || null,
        degree_per: f['degree'] || null,
        // stream: f["course"],
       
        others: f["otherCourse"],
        enterance_exam: f["entranceExam"],
        course_looking_for: f["courseLookingfor"],
        preferance_college_and_location: [
            {
                preferred_college1: f["preferredCollege1"],
                preferred_college2: f["preferredCollege2"],
                preferred_location1: f["preferredLocation1"],
                preferred_location2: f["preferredLocation2"]
            }
        ]
    },
    course:f['course'],
    lead_list_status: f['leadStatus'],
    counselled_by:f['counsellorAdmin'],
    lead_stage:f['leadStages'],
    notes:f['notes'],
    remark:f['remarks'],
    source:f['leadSource'],
    refered_to:f['counsellor'],
    
   
}

  if(this.addLeadForm.invalid){
    this.addLeadForm.markAllAsTouched()
    
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