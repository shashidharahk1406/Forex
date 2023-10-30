import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  editForm!:FormGroup;
  allLevel:any=[]
  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditDepartmentComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],
      level_of_program_id:['',[Validators.required]],

    })
    this.getDepartmentbyId()
  this.getAllLevel();

  }
  get f() {
    return this.editForm.controls;
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
  getDepartmentbyId(){
    this.api.getDepartmentById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})
        this.editForm.patchValue({level_of_program_id:resp.result[0].level_of_program_id})


      },
      (error:any)=>{

      }
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editDepartment(this.id,this.editForm.value).subscribe(
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
