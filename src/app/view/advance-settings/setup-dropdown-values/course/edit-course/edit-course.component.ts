import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  editForm!:FormGroup;
  allDepartment:any=[]
  allLevel:any=[]
  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditCourseComponent>, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  get f() {
    return this.editForm.controls;
  }
  initFilter(){
    this.editForm = this._fb.group({
      course_name:['',[Validators.required]],
      level_of_program_id:['',[Validators.required]],
      department_id:['',[Validators.required]],

    })
    this.getCoursebyId()
    this.getAllDepartment()
    this.getAllLevel()
  }
  getCoursebyId(){
    this.api.getCourseById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({course_name:resp.result[0].course_name})
        this.editForm.patchValue({level_of_program_id:resp.result[0].level_of_program_id})
        this.editForm.patchValue({department_id:resp.result[0].department_id})

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
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editCourse(this.id,this.editForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(this.api.toTitleCase(resp.message))
        },
        (error:any)=>{
          console.log(error);
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
    }

  }





}
