import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {
  editForm!:FormGroup;
  allDepartment:any=[]
  allLevel:any=[]
  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditStreamComponent>, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any,
    private baseService:BaseServiceService) {
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
      stream_name:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],
    })
    this.getCoursebyId()
  }
  getCoursebyId(){
    this.baseService.getByID(`${environment.studying_stream}${this.id}/`).subscribe(
      (resp:any)=>{
        //console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({stream_name:resp.result[0].stream_name})
      },
      (error:any)=>{
        this.api.showError(error.error.message)
      }
    )
  }
 
  edit(){
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched()
    }
    else{
      this.baseService.updateData(`${environment.studying_stream}${this.id}/`,this.editForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(this.api.toTitleCase(resp.message))
        },
        (error:any)=>{
          //console.log(error);
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
    }
  }
}
