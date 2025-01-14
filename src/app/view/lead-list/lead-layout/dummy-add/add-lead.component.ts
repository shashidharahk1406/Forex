import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css'],
})
export class AddLeadComponent implements OnInit {
  addNewLead!: FormGroup;
 
  countryOptions:any = [];
  stateOptions:any = [];
  cityOptions:any = [];
  newChannelOptions:any = [];
  channels:any = [];
  sources:any = [];
  priorities:any = [];
  departmentOptions:any = [];
  courseOptions:any = [];
  yearOfPassingOptions:any = [];
  campaignOptions:any = [];
  mediumOptions:any = [];
  levelOfProgramOptions:any = [];
  subStatus: any = [];
  referredTo:any = [];
  stat_us:any= [];
  time:any = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other'];
  seasons:any = [];
  @Output() addLead = new EventEmitter()
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    private fb: FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private _commonService:CommonServiceService,
    private _datePipe:DatePipe,
    private _addLeadEmitter:AddLeadEmitterService) {
      this.dropDownValues()
    }

  ngOnInit(): void {
    this.initForm()
  }

 initForm(){
  this.addNewLead = this.fb.group({
    firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
    lastName: ['',[Validators.pattern(this._commonService.namePattern)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(this._commonService.mobilePattern)]],
    dateOfBirth:['',[Validators.required]],
    highestQualification: [''],
    callTime:[''],
    campaignName: ['', Validators.required],
    season: [''],
    channel: [''],
    source: [2,Validators.required],
    priority: [''],
    referredTo: [''],
    status:['',Validators.required],
    subStatus:['',Validators.required],
    department: ['', Validators.required],
    course: [''],
    location: [''],
    yearOfPassing: [''],
    primaryNumber:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
    fathersNumber:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
    mothersNumber:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
    alternateNumber:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
    primaryEmail:['',[Validators.required,Validators.email]],
    alternateEmail:['',[Validators.required,Validators.email]],
    fathersEmail:['',[Validators.required,Validators.email]],
    mothersEmail:['',[Validators.required,Validators.email]],
    countryId: [''],
    state: [''],
    cityName: [''],
    newChannel: [''],
    campaign: [''],
    medium: [''],
    levelOfProgram: [''],
  });


 }
  dropDownValues(){
    this.getCountry();
    this.getState();
    this.getChannel();
    this.getSource();
    this.getCity();
    this.getCampign();
    this.getNewChannel();
    this.getDepartment();
    this.getCourse();
    //this.getLocation();
    this.getMedium();
    this.getLevelOfProgram();
    this.getPriority();
    this.getStatus();
    this.getSubStatus();
    this.getSeason();
    this.getCounselor()
  }
  
  getCountry(){
    this.api.getAllCountry().subscribe((res:any)=>{
      if(res.results){
      this.countryOptions = res.results
      //console.log(res)
      }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getState(){
    this.api.getAllState().subscribe((res:any)=>{
      if(res.results){
        this.stateOptions = res.results
        //console.log(res)
      }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getChannel(){
    this.api.getAllChannel().subscribe((resp:any)=>{
      if(resp.results){
        this.channels= resp.results;
        //console.log(this.channels,"this.newChannelOptions")
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
      this.sources = res.results
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
  getNewChannel(){
    this.api.getAllNewChannel().subscribe((res:any)=>{
      if(res.results){
        this.newChannelOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
  }
  getDepartment(){
    this.api.getAllDepartment().subscribe((res:any)=>{
      if(res.results){
        this.departmentOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
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
    // this._baseService.getData(environment.lead_course).subscribe((res:any)=>{
    //   if(res.results){
    //     this.courseOptions = res.results;
    //   }
    //   else{
    //     this.api.showError('ERROR')
    //    }
    //   },(error:any)=>{
    //      this.api.showError(this.api.toTitleCase(error.error.message))
        
    //   })
  }
  getMedium(){
    this.api.getAllMedium().subscribe((res:any)=>{
      if(res.results){
        this.mediumOptions = res.results
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
    })
  }
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((res:any)=>{
      if(res.results){
        this.levelOfProgramOptions = res.results 
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
    })
  }
  getPriority(){
    this._baseService.getData(environment.lead_priority).subscribe((res:any)=>{
        if(res.results){
          this.priorities = res.results
        } else{
          this.api.showError('ERROR')
         }
        },(error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
      })
  }
  getStatus(){
   this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
    if(res.results){
      this.stat_us = res.results;
    }
   },(error:any)=>{
     this.api.showError(this.api.toTitleCase(error.error.message))
   })
  }
  getSubStatus(){
    this._baseService.getData(`${environment.lead_subStatus}`).subscribe((res:any)=>{
      if(res.results){
        this.subStatus = res.results;
      }
     },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
     })
  }
  getSeason(){
    this._baseService.getData(environment.lead_season).subscribe((res:any)=>{
      if(res.results){
        this.seasons = res.results
      } else{
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
  get f() {
    return this.addNewLead.controls;
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
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
  }
}
