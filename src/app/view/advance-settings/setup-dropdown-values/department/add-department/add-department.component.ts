import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  addForm!:FormGroup;
  allLevel:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddDepartmentComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
    this.getLevel()

  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      level_of_program_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  getLevel(){
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
      this.api.postDepartment(this.addForm.value).subscribe(
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
