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
  reportType:any[] = ['All Interactions Report','Last Interactions Report','Untouched Data Report','Lead Stage Report']
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
    private fb:FormBuilder) {
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
      reportType:[''],
      counselorName:[''],
      startDate:[''],
      endDate:['']
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
    this._baseService.getData(`${environment._user}?lead_exists=True&role_name=counsellor`).subscribe((res:any)=>{
      if(res.results){
      this.referredTo = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
  clearSelectField(fieldName: string) {
    this.reportForm.get(fieldName)?.reset();
  }
  get f() {
    return this.reportForm.controls;
  }
  getReports(){
    this._baseService.getData(`${environment.reports}?report_type=last-interaction-report&counsellor_id=${this.reportForm.value['counselorName']}`).subscribe((res:any)=>{
     if(res){
      this.api.showSuccess(res.message)
     }
    },(error:any)=>{
      this.api.showError(error.error.message)
    })
  }
}
