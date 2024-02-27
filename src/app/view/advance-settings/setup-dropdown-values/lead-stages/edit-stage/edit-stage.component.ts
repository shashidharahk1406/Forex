import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';
import { AddStagesComponent } from '../add-stages/add-stages.component';

@Component({
  selector: 'app-edit-stage',
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.css']
})
export class EditStageComponent implements OnInit {
  editForm!:FormGroup;
 

  constructor(
    private _fb:FormBuilder,
    private api:ApiService,
    public dialogRef: MatDialogRef<EditStageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emit:EmitService,
    private baseService:BaseServiceService) 
    { }

  ngOnInit(): void {
    this.initFilter()
    this.getSelectedStage()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],
    })
  }
  get f() {
    return this.editForm.controls;
  }
 getSelectedStage(){
  this.editForm.patchValue({
    name:this.data.name
  })
 }
  submit(){
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched()
    }
    else{
      let editData = {
        id: this.data.id,
        name:this.editForm.value.name,
        created_date_time:this.data.created_date_time,
        updated_date_time: null
       }
      this.baseService.updateData(`${environment.leadStage}${this.data.id}/`,editData).subscribe(
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
