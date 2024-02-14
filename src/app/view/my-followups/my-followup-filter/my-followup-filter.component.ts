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
  counselorList: any=[];
  filterFollowUpForm!:FormGroup;
  counsellor_id:any
  page=1;
 pageSize=10;
allFollowUpData:any=[]
@Output()filterApplied = new EventEmitter()
@Output() filter:any = new EventEmitter();
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private fb:FormBuilder,
    private _addLeadEmitter:AddLeadEmitterService,
  ) {

    this.counsellor_id=localStorage.getItem('user_id')
   }

  ngOnInit(): void {
    this.getCounselor();
    this.getAllFollowUps();
    this.filterFollowUpForm = this.fb.group({
      counsellor_id:[''],
      follow_up_status:['']
     
    })
  }


  get f() {
    return this.filterFollowUpForm.controls;
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


  getAllFollowUps(){
    this.api.getAllFollowUp(this.counsellor_id,this.page,this.pageSize).subscribe((res:any)=>{
      console.log(res,"All followups")
      this.allFollowUpData=res.results;
    })
  }


  closePopup(){
    this._bottomSheetRef.dismiss()
  }
followUpStatus:any
  onSubmit(){
    // this.counsellor_id=counsl_id;
    // this.followUpStatus=followUp_Status
    if (this.filterFollowUpForm.invalid) {
      this.filterFollowUpForm.markAllAsTouched()
      this.api.showError('Invalid Form')
    } else{
     const formValues = this.filterFollowUpForm.value;
   
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
      // this.api.filterFollowUps(this.filterFollowUpForm.values,this.page,this.pageSize)
       const apiUrl = `${environment.followUps}?page=1&page_size=10&${queryParams.join('&')}`;
       this._addLeadEmitter.followUpFilter.next(apiUrl)
       this._addLeadEmitter.triggerFilter()
       this._addLeadEmitter.followUpFilter.next('true')
       // Make the API request with the constructed URL
      this.closePopup()
   
      }}}


  

  clearSelectField(fieldName: string) {
    this.filterFollowUpForm.get(fieldName)?.reset();
  }
}
