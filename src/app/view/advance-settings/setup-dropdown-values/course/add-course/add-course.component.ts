import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addForm!:FormGroup;
  allDepartment:any=[]
  allLevel:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddCourseComponent>, private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
    this.getAllDepartment()
    this.getAllLevel()
  }
  initFilter(){
    this.addForm = this._fb.group({
      course_name:['',[Validators.required]],
      level_of_program_id:['',[Validators.required]],
      department_id:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],
    })
  }
  get f() {
    return this.addForm.controls;
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
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postCourse(this.addForm.value).subscribe(
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
