import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm!:FormGroup;
  allReasonGroup:any=[]
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
    this.getAllReasonGroup()
  }
  initFilter(){
    this.addForm = this._fb.group({
      sub_status_name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      reason_group_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  getAllReasonGroup(){
    this.api.getAllReasonGroup().subscribe(
      (resp:any)=>{
        this.allReasonGroup=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postSubStatus(this.addForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
        },
        (error:any)=>{
          console.log("error");
          
        }
      )
    }

  }

}
