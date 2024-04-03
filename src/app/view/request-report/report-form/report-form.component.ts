import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  startDate:any;
  max:any;
  counselorName:any;
  statusArray: any = [];
  selectedStatus:any;
  referredTo: any = [];
  user_id: any;
  reportForm!:FormGroup;
  reportType:any[] = [ 
  {
    type:'All Interactions Report',
    id:'1'
  },
  {
    type:'Last Interactions Report',
    id:'last-interaction-report'
  },
  {
    type:'Untouched Data Report',
    id:'2'
  },
  {
    type:'Lead Stage Report',
    id:'1'
  },
 ]
  leadStage:any[] = [];
  show: boolean = false;
    
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
      this.max = new Date()
     }

  ngOnInit(): void {
    this.getLeadStage()
    this.getCounselor()
    this.initForm()
  }
  initForm(){
    this.reportForm = this.fb.group({
      reportType:['',Validators.required],
      counselorName:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    })
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
    
    this._baseService.getData(`${environment.counsellor_list_report}?report_type=last-interaction-report&lead_exists=True`).subscribe((res:any)=>{
      if(res.results){
      this.referredTo = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error?.error.message))
    }))
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
    this._baseService.postDataWithParams(`${environment.counsellor_list_report}?report_type=${reportType}&counsellor_id=${counsellor}&start_date=${startDate}&end_date=${endDate}`).subscribe((res:any)=>{
     if(res){
      this.api.showSuccess(res.message)
     }
    },(error:any)=>{
      this.api.showError(error.error.message)
    })
  }
  }
}
