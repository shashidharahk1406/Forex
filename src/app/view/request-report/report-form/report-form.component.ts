import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  @ViewChild('select') select!: MatSelect;

  startDate:any;
  max:any;
  checkAll = false;
  counselorName:any;
  statusArray: any = [];
  selectedStatus:any;
  referredTo: any = [];
  user_id: any;
  reportForm!:FormGroup;
  user_email:any;
  reportType:any[] = [ 
  {
    type:'All Interactions Report',
    id:'all-interaction-report'
  },
  {
    type:'Last Interactions Report',
    id:'last-interaction-report'
  },
  {
    type:'Untouched Data Report',
    id:'untouched-report-report'
  },
  // {
  //   type:'Followups Report',
  //   id:'follow-up-report'
  // },
  {
    type:'Lead Stage Report',
    id:'1'
  },
 ]
  leadStage:any[] = [];
  show: boolean = false;
  user_role: string | undefined;
  endMin: any;
  min: any;
  
  toggleAllSelection(event:MatCheckboxChange): void {
    const isChecked = event.checked;
    if (isChecked) {
      this.reportForm?.controls['counselorName'].setValue(this.referredTo?.map((option:any) => option.id));
    } else {
      this.reportForm?.controls['counselorName'].setValue([]);
    }
  }

  isAllSelected(): boolean {
    const selectedOptions = this.reportForm?.controls['counselorName'].value;
    return selectedOptions?.length === this.referredTo?.length;
  }
    
  selectedReports(type:any,type2?:any){
    if(type === 'Lead Stage Report' || type2 ){
      this.show = true
    }else{
      this.show = false
    }
  }
  
  constructor(
    private _baseService:BaseServiceService,
    private api:ApiService,
    private fb:FormBuilder,
    private datePipe:DatePipe) {
      this.user_id = localStorage.getItem('user_id')
      this.user_role = localStorage.getItem('user_role')?.toUpperCase();
      this.max = new Date()
      this.min = new Date('1900-01-01')
      this.user_email = localStorage.getItem('user_email')
      this.getCounselor()
     }

  ngOnInit(): void {
    this.getLeadStage()
    this.initForm()
  }
  initForm(){
    this.reportForm = this.fb.group({
      reportType:[null,Validators.required],
      counselorName:[null,Validators.required],
      endDate:[null,Validators.required],
      startDate:[null,Validators.required]
      
    })
    //  // Subscribe to start date value changes
    //  this.reportForm.get('startDate')?.valueChanges.subscribe(() => {
    //   // Clear end date when start date changes
    //   this.reportForm.patchValue({ endDate: null });
    // });
  }
  getLeadStage(){
    this._baseService.getData(environment.leadStage).subscribe((res:any)=>{
     if(res){
      this.leadStage = res
     
     }
    },((error:any)=>{
     this.api.showError(error.error.message)
    }))
   }
   getCounselor(){
      let query = this.user_role === "COUNSELLOR" || this.user_role === "COUNSELOR"  || this.user_role === "ADMIN"  ?`?user_id=${this.user_id}` : ``
      this._baseService.getData(`${environment._user}${query}`).subscribe((res:any)=>{
        if(res.results){
        this.referredTo = res.results
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error?.error.message))
      }))
   
  }
  onChange(event:any){
    if(event){
     // this.endMin = this.reportForm.value.startDate
      this.reportForm.patchValue({
        endDate:['']
      })
    }
  }
  clearSelectField(fieldName: string) {
    this.reportForm.get(fieldName)?.reset();
  }
  get f() {
    return this.reportForm.controls;
  }
  getReports(){
    if(this.reportForm.invalid){
      this.reportForm.markAllAsTouched()
     
    }else{
     
    const startDate = this.datePipe.transform(this.reportForm.value['startDate'],'yyyy-MM-dd')
    const endDate = this.datePipe.transform(this.reportForm.value['endDate'],'yyyy-MM-dd')
    const counsellor = this.reportForm.value['counselorName']
    const reportType = this.reportForm.value['reportType']
    this._baseService.postDataWithParams(`${environment.counsellor_list_report}?report_type=${reportType}&counsellor_id=${counsellor}&start_date=${startDate}&end_date=${endDate}&email=${this.user_email}`).subscribe((res:any)=>{
     if(res){
      this.api.showSuccess(res.message)
      this.resetForm()
     }
    },(error:any)=>{
      this.api.showError(error.error.message)
    })
  }
  }
  resetForm(){
  this.reportForm = this.fb.group({
    reportType:[null],
    counselorName:[null],
    endDate:[null],
    startDate:[null]
  })
}

}

