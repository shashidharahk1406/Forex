import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {
  quickAddForm!: FormGroup;

  channels:any = [];
  sources:any = [];
  campaigns:any = [];
  mediums:any = [];
  levels:any = [];
  departments:any = [];
  courses:any = [];
  referredTo: any;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<QuickAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _commonService:CommonServiceService,
    private _addLeadEmitter:AddLeadEmitterService) {}

  ngOnInit() {
    this.dropDownList()
    this.initForm()
  }
  initForm(){
    this.quickAddForm = this.formBuilder.group({
      firstName: ['', Validators.required,Validators.pattern(this._commonService.namePattern)],
      lastName: ['', Validators.required,,Validators.pattern(this._commonService.namePattern)],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
      channel: [''],
      source: ['', Validators.required],
      campaign: [''],
      medium: [''],
      level: ['', Validators.required],
      department: ['', Validators.required],
      course: ['', Validators.required],
      counsellor:['',Validators.required]
    });
  }
  dropDownList(){
    this.getChannel()
    this.getSource()
    this.getCampign()
    this.getCourse()
    this.getDepartment()
    this.getLevelOfProgram()
    this.getMedium()
    this.getCounselor()
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
 
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.campaigns = res.results;
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
        this.departments = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error?.error.message))
        
      })
  }
  getCourse(){
    this.api.getAllCourse().subscribe((res:any)=>{
      if(res){
        this.courses = res;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error?.error.message))
        
      })
  }
  getMedium(){
    this.api.getAllMedium().subscribe((res:any)=>{
      if(res.results){
        this.mediums = res.results
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error?.error.message))
    })
  }
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((res:any)=>{
      if(res.results){
        this.levels = res.results 
      } else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error?.error.message))
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
  clearSource() {
    this.quickAddForm.get('source')?.setValue('');
  }
  
  clearCampaign() {
    this.quickAddForm.get('campaign')?.setValue('');
  }
  
  clearMedium() {
    this.quickAddForm.get('medium')?.setValue('');
  }
  
  clearLevel() {
    this.quickAddForm.get('level')?.setValue('');
  }
  
  clearDepartment() {
    this.quickAddForm.get('department')?.setValue('');
  }
  
  clearCourse() {
    this.quickAddForm.get('course')?.setValue('');
  }
  clearChannel(){
    this.quickAddForm.get('channel')?.setValue('');
  }
  clearLeadOwner(){
    this.quickAddForm.get('counsellor')?.setValue('');
  }
  onSubmit(){
    let f = this.quickAddForm.value
   
     let data:any ={
      // user_data: {
          first_name: f.firstName,
          last_name: f.lastName,
          email: f.email,
          mobile_number: f.mobile,
          role:5,
      // },
  
      higest_qualification: null,
      campaign_name:null,
      season_id:f.season,
      channel_id:f.channel,
      source_id:f.source,
      priority_id:null,
      refered_to:f.counsellor,
      lead_list_status_id:null,
      lead_list_substatus_id:null,
      department_id:f.department,
      date_of_birth:null,
      course_id:f.course,
      location: null,
      year_of_passing:null,
      best_time_to_call:null,
      country_id:null,
      state_id:null,
      city_id:null,
      new_channel_id:null,
      campaign_id:f.campaign,
      medium_id:f.medium,
      level_of_program_id:f.levels,
      lead_contact:{
        alternate_phone_number:null,
        primary_phone_number: null,
        father_phone_number:null,
        mother_phone_number:null,
        alternate_email:null,
        primary_email:null,
        father_email:null,
        mother_email:null,
    }
    
     }
    if(this.quickAddForm.invalid){
      this.quickAddForm.markAllAsTouched()
      
    }
    else{
      this._baseService.postData(environment.lead_list,data).subscribe((res:any)=>{
        if(res){
          // this.addLead.emit('ADD')
          this.api.showSuccess(res.message)
          this.dialogRef.close('yes');
          this._addLeadEmitter.triggerGet();
        }
        else{
          this.api.showError("ERROR !")
        }
      },((error:any)=>{
        this.api.showError(error?.error.message)
      }))
    }
  }
}
