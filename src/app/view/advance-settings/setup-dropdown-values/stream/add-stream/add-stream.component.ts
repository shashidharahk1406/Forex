import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent implements OnInit {
  addForm!:FormGroup;
  allDepartment:any=[]
  allLevel:any=[]

  constructor(
    private _fb:FormBuilder,
    private api:ApiService,
    public dialogRef: MatDialogRef<AddStreamComponent>,
    private emit:EmitService,
    private baseService:BaseServiceService,
    private _commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.addForm = this._fb.group({
      stream_name:['',[Validators.required,Validators.pattern(this._commonService.namePattern)]],
      is_active:[true],
      is_system_value:[true],
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
      this.baseService.postData(`${environment.studying_stream}`,this.addForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(this.api.toTitleCase(resp.message))
        },
        (error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
    }

  }




}
