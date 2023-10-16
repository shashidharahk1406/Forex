import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/service/API/api.service';

export interface UserData {
  'User Name': string,
  'Email': string,
  'Mobile': string,
  'User Role': string,
  'Designation':string,

}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements AfterViewInit {
  addEmployee!:FormGroup;


  hideShow:boolean=false
  displayedColumns: string[] = [
    'employee_name',
    'call_target',
    'message_target',
    'lead_generation_target',
    'sales_target',
  ]
  dataSource=new MatTableDataSource<UserData>;
  displayedAchievedColumns: string[] = [
    'employee_name',
    'call_target',
    'message_target',
    'lead_generation_target',
    'sales_target',
  ]
  dataSourceAchieved=new MatTableDataSource<UserData>;
  displayedReportColumns: string[] = [
    'employee_name',
    'call_target',
    'message_target',
    'lead_generation_target',
    'sales_target',
  ]
  dataSourceReport=new MatTableDataSource<UserData>;

  
  allTarget:any=[]
  allAcheived:any=[]
  allReport:any=[]
  initFilter(){
    this.addEmployee = this._fb.group({
      emp_ids:[''],
    })
  }
  get f() {
    return this.addEmployee.controls;
  }

  constructor( private api:ApiService,private _fb:FormBuilder) {
      

  }
  ngOnInit(){
    this.initFilter()
  }
  ngAfterViewInit() {

    this.getTarget(); 
    this.getAcheived(); 


    // this.dataSource.sort = this.sort;

  }

  getTarget(){
    this.api.getTarget().subscribe((resp:any)=>{
      console.log(resp.results);
      this.allTarget= resp;
      this.dataSource = new MatTableDataSource<any>(this.allTarget);
    },(error:any)=>{
      console.log(error);
      // this.dataSource.sort = this.sort;
    }

    )
  }
  getAcheived(){
    this.api.getAcheived().subscribe((resp:any)=>{
      console.log(resp[0]);
      this.allAcheived= resp;
      this.dataSourceAchieved = new MatTableDataSource<any>(this.allAcheived);
    },(error:any)=>{
      console.log(error);
      
    }

    )
  }
  async onOptionSelected(event: any) {
    const selectedOptionValue = event.value; // Get the selected option's value
    console.log('Selected option:', selectedOptionValue);
    await this.addEmployee.patchValue({emp_ids:selectedOptionValue})
    this.api.postEmployeeForReport(this.addEmployee.value).subscribe(
      (resp:any)=>{
        if(resp.length==0){
          this.hideShow=false
        }
        else{
          this.hideShow=true
          this.allReport= resp;
          this.dataSourceReport = new MatTableDataSource<any>(this.allReport);
        }
       
      },
      (err:any)=>{

      }
    )
  }
  
  
  
  
 
 
}
