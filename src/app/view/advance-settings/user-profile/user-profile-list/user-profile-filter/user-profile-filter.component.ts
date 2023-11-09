import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-user-profile-filter',
  templateUrl: './user-profile-filter.component.html',
  styleUrls: ['./user-profile-filter.component.css']
})
export class UserProfileFilterComponent implements OnInit {
  filterForm!:FormGroup;
  allRole:any=[]
  allUser:any=[]
  allDesignation:any=[]
  allDepartment:any=[]
  allLevel:any=[]
  constructor(private _fb:FormBuilder,private api:ApiService,private datePipe:DatePipe,public dialogRef: MatDialogRef<AddNewUserComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
  }
  createdFromDate(event_from: MatDatepickerInputEvent<Date>,dateType:any) {
    if(dateType=="creationFrom"){
      this.filterForm.patchValue({created_date_time_before:this.datePipe.transform(event_from.value,"yyyy-MM-dd")})
    }
    else if(dateType=="creationTo"){
      this.filterForm.patchValue({created_date_time_after:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
    }
    else if(dateType=="loginFrom"){
      this.filterForm.patchValue({last_login_before:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
    }
    else if(dateType=="loginTo"){
      this.filterForm.patchValue({last_login_after:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
    }
    else if(dateType=="updateFrom"){
      this.filterForm.patchValue({updated_date_time_before:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
    }
    else if(dateType=="updateTo"){
      this.filterForm.patchValue({updated_date_time_after:this.datePipe.transform(event_from.value,"yyyy-MM-dd")}) 
    }
  }
  initFilter(){
    this.filterForm = this._fb.group({
      role_ids:[''],
      is_active:[''],
      designation:[''],
      reporting_to_ids:[''],
      level_of_program:[''],
      department:[''],
      created_date_time_before:[''],
      created_date_time_after:[''],
      last_login_before:[''],
      last_login_after:[''],
      updated_date_time_before:[''],
      updated_date_time_after:[''],

    })
    this.getAllRole()
    this.getAllUser()
    this.getDesignation()
    this.getDesignation()
    this.getAllDepartment()
    this.getAllLevel()

  }
  get f() {
    return this.filterForm.controls;
  }
  getAllRole(){
    this.api.getAllRole().subscribe(
      (resp:any)=>{
        this.allRole=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllUser(){
    this.api.getAllUser().subscribe(
      (resp:any)=>{
        this.allUser=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getDesignation(){
    this.api.getAllDesignation().subscribe(
      (resp:any)=>{
        this.allDesignation=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllDepartment(){
    this.api.getAllDepartment().subscribe(
      (resp:any)=>{
        this.allDepartment=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllLevel(){
    this.api.getAllLevelOfProgram().subscribe(
      (resp:any)=>{
        this.allLevel=resp.results
      },
      (error:any)=>{

      }
      
    )
  }

  status: any = [true,false];
  baseurl= environment.live_url;
  submit(){
    const formValues = this.filterForm.value;

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
    const apiUrl = `${this.baseurl}/api/filter-users?${queryParams.join('&')}`;

    // Make the API request with the constructed URL
    this.api.getuserByFilter(apiUrl).subscribe((resp:any) => {
      // Handle the API response
      this.emit.sendRefreshbyFilter(resp)
      this.dialogRef.close()
      // this.api.showSuccess(resp.message)
    });
  }
  }

