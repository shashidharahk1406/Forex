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

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _addLeadEmitter:AddLeadEmitterService,
    ) {}

  ngOnInit(): void {
    this.initForm()
    this.dropdownvalues()
  }
  get f() {
    return this.filterLead.controls;
  }
  dropdownvalues(){
    this.getChannel()
    this.getSource()
    this.getCity()
    this.getDepartment()
    this.getCampign()
    this.getCounselor()
    this.getChannel()
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
      this.api.showError(error.error.message)
      
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
       this.api.showError(error.error.message)
       
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
      this.api.showError(error.error.message)
      
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
        this.api.showError(error.error.message)
        
      })
  }
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.campaignList = res.results;
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
        this.departmentList = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
        this.api.showError(error.error.message)
        
      })
  }
  getCounselor(){
    this._baseService.getData(`${environment._user}/?role=counsellor`).subscribe((res:any)=>{
      if(res){
      this.counselorList = res
      }
    },((error:any)=>{
      this.api.showError(error.error.message)
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
       if (value !== '' && value !== undefined) {
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
     // Make the API request with the constructed URL
    this.closePopup()
    }

   
  }
  
  initForm(){
    this.filterLead = this.fb.group({
      counsellor_id:[''],
      campaign_id:[''],
      channel_id:[''],
      source_id:[''],
      department_id:[''],
      course_id:[''],
      city_id:[''],
      year_of_passing:['']
    })
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
  }
}
