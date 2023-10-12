import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css'],
  animations: [
    trigger('sheetState', [
      state('open', style({
        transform: 'translateY(0)'
      })),
      state('closed', style({
        transform: 'translateY(0)'
      })),
      transition('closed => open', animate('0.10s ease-in-out')),
      transition('open => closed', animate('0.10s ease-in-out'))
    ])
  ]
})
export class AddLeadComponent implements OnInit {
  isOpen = false;
  addNewLead!: FormGroup;
  seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  countryOptions:any = [];
  stateOptions:any = [];
  cityOptions:any = [];
  newChannelOptions:any = [];
  channels:any = [];
  sources:any = [];
  priorities = ['3-Hot', 'Medium', 'Low'];
  referredTo = ['Live Chat', 'Option 2', 'Option 3'];
  stat_us = ['Callback','Closed','Enrolled','New'];
  departmentOptions:any = [];
  courseOptions:any = [];
  locationOptions:any = ['Location1','Location2'];
  yearOfPassingOptions = ['2020', '2021', '2022', '2023'];

  campaignOptions = ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'];
  mediumOptions = ['Medium 1', 'Medium 2', 'Medium 3', 'Medium 4'];
  levelOfProgramOptions = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
  time = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other'];

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    private fb: FormBuilder,
    private _baseService:BaseServiceService,private api:ApiService) {
      this.dropDownValues()
    }

  ngOnInit(): void {
    this.isOpen = !this.isOpen;
    this.initForm()
  }

 initForm(){
  this.addNewLead = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    highestQualification: [''],
    callTime:[''],
    campaignName: ['', Validators.required],
    season: [''],
    channel: [''],
    source: ['',Validators.required],
    priority: [''],
    referredTo: [''],
    status:['',Validators.required],
    department: ['', Validators.required],
    course: [''],
    location: [''],
    yearOfPassing: [''],
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
  }
  getCountry(){
    this.api.getAllCountry().subscribe((res:any)=>{
      if(res){
      this.countryOptions = res.results
      console.log(res)
      }
    },(error:any)=>{
      this.api.showError(error.error.message)
      
    })
  }
  getState(){
    this.api.getAllState().subscribe((res:any)=>{
      if(res){
        this.stateOptions = res.results
        console.log(res)
      }
    },(error:any)=>{
      this.api.showError(error.error.message)
      
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
      this.api.showError(error.error.message)
      
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
      this.api.showError(error.error.message)
      
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
        this.api.showError(error.error.message)
        
      })
  }
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.cityOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
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
        this.api.showError(error.error.message)
        
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
        this.api.showError(error.error.message)
        
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
        this.api.showError(error.error.message)
        
      })
  }
  // getLocation(){
  //   this.api.getAll().subscribe((res:any)=>{
  //     if(res.results){
  //       this.newChannelOptions = res.results;
  //     }
  //     else{
  //       this.api.showError('ERROR')
  //      }
  //     },(error:any)=>{
  //       this.api.showError(error.error.message)
        
  //     })
  // }
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
          mobile_number: f.mobile
      },
  
   
   
   
      higest_qualification: f.highestQualification,
      campaign_name:f.campaignName,
      season_id:f.season,
      channel_id:f.channel,
      source_id:f.source,
      priority_id:f.priority,
      refered_to_id:f.referredTo,
      lead_list_status_id:f.status,
      department_id:f.department,
      course_id:f.course,
      location: f.location,
      year_of_passing:f.yearOfPassing,
      best_time_to_call:f.callTime,
      country_id:f.countryId,
      state_id:f.state,
      city_id:f.cityName,
      new_channel_id:f.newChannel,
      campaign_id:f.campaign,
      medium_id:f.medium,
      level_of_program_id:f.levelOfProgram,
      // lead_type:"dhf"
  }
    if(this.addNewLead.invalid){
      this.addNewLead.markAllAsTouched()
    }
    else{
      this._baseService.postData(environment.lead_list,data).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message) 
        }
        else{
          this.api.showError("ERROR !")
        }
      },(error=>{
        this.api.showError(error.error.message)
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
    this.isOpen = !this.isOpen;
  }
}
