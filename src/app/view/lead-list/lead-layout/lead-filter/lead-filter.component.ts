import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-filter',
  templateUrl: './lead-filter.component.html',
  styleUrls: ['./lead-filter.component.css'],
  
})
export class LeadFilterComponent implements OnInit {
filterLead!:FormGroup
@Output()filterApplied = new EventEmitter()
counselorList:any = [];
channelsList:any = [];
sourceList:any = [];
departmentList:any = [];
courseList:any = [];
status:any = [];
cityList:any = [];
campaignList: any;
queryItems: any;
@Output() filter:any = new EventEmitter();
  counselled_by: any;

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _addLeadEmitter:AddLeadEmitterService,
    ) {}

  ngOnInit(): void {
    this.dropdownvalues()
    this.initForm() 
  }
  get f() {
    return this.filterLead.controls;
  }
  dropdownvalues(){
    this.getChannel()
    this.getSource()
    this.getCity()
    this.getCounselor()
    this.getChannel()
    this.getCourse()
    this.getCounselledBy()
  }
  getChannel(){
    this.api.getAllChannel().subscribe((resp:any)=>{
      if(resp.results){
        this.channelsList= resp.results;
      }
      else{
        this.api.showError('ERROR')
      }  
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    }

    )
  }
  getCourse(){
    this.api.getAllCourse().subscribe((res:any)=>{
      if(res.results){
       this.courseList = res.results
      }
      else{
       this.api.showError('ERROR')
      }
     },(error:any)=>{
        this.api.showError(this.api.toTitleCase(error.error.message))
       
     })
  }
  getSource(){
    this.api.getAllSource().subscribe((res:any)=>{
     if(res.results){
      this.sourceList = res.results
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
        this.cityList = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
  }
  
  getCounselledBy(){
    this._baseService.getData(`${environment._user}/?role_name=Admin`).subscribe((res:any)=>{
      if(res){
      this.counselled_by = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  } 
 
  getCounselor(){
    this._baseService.getData(`${environment._user}/?role_name=counselPlor`).subscribe((res:any)=>{
      if(res){
      this.counselorList = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
  clearSelectField(fieldName: string) {
    this.filterLead.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.filterLead.invalid) {
      this.filterLead.markAllAsTouched()
      this.api.showError('Invalid Form')
    } else{
     const formValues = this.filterLead.value;
   
     // Create an array of query parameters with non-empty values
     const queryParams = [];
     for (const key in formValues) {
       const value = formValues[key];
       if (value !== '' && value !== undefined && value !== null) {
         if (Array.isArray(value)) {
           // Handle multi-select fields
           if (value.length > 0) {
             // Convert array of objects to a comma-separated string of IDs
             const ids = value.map((item) => item.id).join(',');
             queryParams.push(`${key}=${ids}`);
           }
         } else {
           queryParams.push(`${key}=${value}`);
         }
       }
     }
   
 
     // Construct the API request URL with query parameters
     const apiUrl = `${environment.lead_list}?page=1&page_size=10&${queryParams.join('&')}`;
   
    this._addLeadEmitter.leadFilter.next(apiUrl)
     this._addLeadEmitter.triggerFilter() 
     this._addLeadEmitter.leadFilterIcon.next('true')
     // Make the API request with the constructed URL
    this.closePopup()
    }

   
  }
  
  initForm(){
    this.filterLead = this.fb.group({
      counsellor_id:[''],
      counselled_by:[''],
      campaign_id:[''],
      channel_id:[''],
      source_id:[''],
      department_id:[''],
      course_id:[''],
      stream_id:[''],
      city_id:[''],
      year_of_passing:['']
    })
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
  }
}
