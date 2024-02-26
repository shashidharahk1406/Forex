import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-stages',
  templateUrl: './add-stages.component.html',
  styleUrls: ['./add-stages.component.css']
})
export class AddStagesComponent implements OnInit {
  addForm!:FormGroup;
 

  constructor(
    private _fb:FormBuilder,
    private api:ApiService,
    public dialogRef: MatDialogRef<AddStagesComponent>, 
    private emit:EmitService,
    private baseService:BaseServiceService) 
    { }

  ngOnInit(): void {
    this.initFilter()
    
  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
    })
  }
  get f() {
    return this.addForm.controls;
  }
 
  submit(){
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
    }
    else{
      this.baseService.postData(environment.leadStage,this.addForm.value).subscribe(
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
