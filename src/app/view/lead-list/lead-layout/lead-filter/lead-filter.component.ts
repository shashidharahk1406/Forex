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
  streamList: any = [];
  user_role: any;
  user_id: any;

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _addLeadEmitter:AddLeadEmitterService,
    ) {
      this.user_id = localStorage.getItem('user_id')
      this.user_role = localStorage.getItem('user_role')?.toUpperCase()
    }

  ngOnInit(): void {
    this.dropdownvalues()
    this.initForm() 
    this._addLeadEmitter.selectedFilter.subscribe((res:any)=>{
      if(res){
        this.filterLead.patchValue({
          counsellor_id:res.counsellor_id,
          counselled_by:res.counselled_by,
          campaign_id:res.campaign_id,
          channel_id:res.channel_id,
          source_id:res.source_id,
          department_id:res.department_id,
          course_id:res.course_id,
          stream_id:res.stream_id,
          city_id:res.city_id,
          year_of_passing:res.year_of_passing
        }) 
      }
    })
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
    this.getStream()
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
      if(res){
       this.courseList = res
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
  getStream(){
    this._baseService.getData(`${environment.studying_stream}`).subscribe((resp:any)=>{
    if(resp){
     this.streamList = resp
    } 
    },(error:any)=>{
     this.api.showError(error.error.message)
    }

    )
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
    let query = this.user_role === "COUNSELLOR" || this.user_role === "COUNSELOR"  || this.user_role === "ADMIN"  ?`?user_id=${this.user_id}&role_name=counsellor` : `?role_name=counsellor`
    this._baseService.getData(`${environment._user}${query}`).subscribe((res:any)=>{
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
    if (this.isFormEmpty(this.filterLead.value)) {
      this.filterLead.markAllAsTouched();
      this.api.showError('Please select at least one field');
      this.filterLead.reset()
      this._addLeadEmitter.leadFilter.next('') 
      this._addLeadEmitter.selectedFilter.next('')
      this._addLeadEmitter.leadFilterIcon.next('false')
   

    } else{
   
     const formValues = this.filterLead.value;
     //console.log(formValues,"formValues")
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
     let apiUrl = `${environment.lead_list}?page=1&page_size=10&allocation_type=allocation`;
     let filterParams:any;
     if(queryParams.length > 0){
      apiUrl +=`&${queryParams.join('&')}`
      filterParams = `&${queryParams.join('&')}`
      this._addLeadEmitter.filterWithPageSize.next(filterParams)
     }
    this._addLeadEmitter.leadFilter.next(apiUrl)
    this._addLeadEmitter.selectedFilter.next(this.filterLead.value)
     this._addLeadEmitter.triggerFilter() 
     this._addLeadEmitter.leadFilterIcon.next('true')
     // Make the API request with the constructed URL
    this.closePopup()
    }

   
  }
  reset(){
   this.filterLead.reset()
   this._addLeadEmitter.leadFilter.next('') 
   this._addLeadEmitter.selectedFilter.next('')
   this._addLeadEmitter.leadFilterIcon.next('false')
   this._addLeadEmitter.triggerGet()
  }
  isFormEmpty(formValues: any): boolean {
    for (const key in formValues) {
      if (formValues[key] !== null) {
        return false;
      }
    }
    return true;
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
