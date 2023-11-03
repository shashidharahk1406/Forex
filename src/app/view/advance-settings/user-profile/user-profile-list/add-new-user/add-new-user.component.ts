import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
  addForm!:FormGroup;
  allDepartment:any=[]
  allLevel:any=[]
  allRole:any=[]
  allUser:any=[]
  allDesignation:any=[]
  is_allow_for_app:boolean=false
  user_id:any
  constructor(private datePipe:DatePipe,private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddNewUserComponent>,private emit:EmitService) { 
    this.user_id=localStorage.getItem('user_id')
  }

  ngOnInit(): void {
    this.initFilter()
  
  }
  initFilter(){
    this.addForm = this._fb.group({
      first_name:['',[Validators.required]],
      last_name:[''],
      email:['',[Validators.required,Validators.email]],
      mobile_number:['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]],
      emp_key:[null],
      target:[''],
      start_date:[''],
      designation_id:['',[Validators.required]],
      role_id:['',[Validators.required]],
      reporting_to_ids:['',[Validators.required]],
      is_allow_for_app:[false],
      level_of_program_id:['',[Validators.required]],
      department_id:[''],
      password:[null],
      created_by:['',[Validators.required]]
    })
    this.getAllDepartment()
    this.getAllLevel()
    this.getAllRole()
    this.getAllUser()
    this.getDesignation()
  }
  get f() {
    return this.addForm.controls;
  }
date(event: MatDatepickerInputEvent<Date>){
  console.log(event.value);
  this.addForm.patchValue({start_date:this.datePipe.transform(event.value,'yyyy-MM-dd')})
  console.log(event.value);

}
onChange(event:any){
  console.log(event.checked);
  this.is_allow_for_app=event.checked
  
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
submit(){
  this.addForm.patchValue({is_allow_for_app:this.is_allow_for_app})
  this.addForm.patchValue({created_by:Number(this.user_id)})
  console.log(this.addForm.value)
  if(this.addForm.invalid){
    console.log("==Invalid==");
    
  }
  else{
    this.api.postUser(this.addForm.value).subscribe(
      (resp:any)=>{
        this.emit.sendRefresh(true)
        this.dialogRef.close()
        this.api.showSuccess(resp.message)
      },
      (error:any)=>{
        console.log(error);
        this.api.showError(error.error.message)
      }
    )
  }
}

}
