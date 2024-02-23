import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';

@Component({
  selector: 'app-my-followup-filter',
  templateUrl: './my-followup-filter.component.html',
  styleUrls: ['./my-followup-filter.component.css']
})
export class MyFollowupFilterComponent implements OnInit {
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
  streamsList:any=[]
  @Output() filter:any = new EventEmitter();
    counselled_by: any;
  role:any;
    constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
      private fb: FormBuilder,
      private api:ApiService,
      private _baseService:BaseServiceService,
      private _addLeadEmitter:AddLeadEmitterService,
      ) {
        this.role=localStorage.getItem('user_role')
      }
  
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
      this.getStream();
      this.getAllFollowupStatuses()
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

    getStream(){
      this.api.getStreams().subscribe((res:any)=>{
        console.log(res,"streams response");
        this.streamsList=res.results;
      },((error:any)=>{
        this.api.showError(this.api.toTitleCase(error.error))
      }))
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
      this._baseService.getData(`${environment._user}/?role_name=counsellor`).subscribe((res:any)=>{
        if(res){
        this.counselorList = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }


    AllFollowupStatuses:any=[]
  getAllFollowupStatuses(){
    this.api.allFollowUpStatuses().subscribe((res:any)=>{
      console.log(res,"all folloups")
      this.AllFollowupStatuses=res
    })
  }
    clearSelectField(fieldName: string) {
      this.filterLead.get(fieldName)?.reset();
    }
    page = 1;
    pageSize = 5;
  
    
    initForm(){
      this.filterLead = this.fb.group({
        counsellor_id:[''],
        // campaign_id:[''],
        // channel_id:[''],
        source_id:[''],
        // department_id:[''],
        stream_id:[''],
        course_id:[''],
        city_id:[''],
        follow_up_status:['']
        // year_of_passing:['']
      })
    }
    closePopup(){
      this._bottomSheetRef.dismiss()
    }


      onSubmit() {
      console.log(this.filterLead.value,"filter followup values")
      if (this.filterLead.invalid) {
        this.filterLead.markAllAsTouched()
        this.api.showError('Invalid Form')
      } else{
       const formValues = this.filterLead.value;
      //  this.api.filterFollowupsForAdmin(formValues,this.page,this.pageSize).subscribe((res:any)=>{
      //   console.log(res,"filtered records")
      //  })
     
       // Create an array of query parameters with non-empty values
       const queryParams = [];
       for (const key in formValues) {
         const value = formValues[key];
         console.log(value,"form valuesssssssss")
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
       const apiUrl = `${environment.lead_follow_up}?page=1&page_size=10&${queryParams.join('&')}`;
     
      this._addLeadEmitter.leadFilter.next(apiUrl)
       this._addLeadEmitter.triggerFilter()
       this._addLeadEmitter.followUpFilterIcon.next('true')
       // Make the API request with the constructed URL
      this.closePopup()
      }
  
     
    }
}
