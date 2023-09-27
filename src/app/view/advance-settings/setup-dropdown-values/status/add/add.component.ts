import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm!:FormGroup;
  allMasterStatus:any=[]
  allStatusGroup:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.initFilter()
    this.getAllMasterStatus()
    this.getAllStatusGroup()
  }
  initFilter(){
    this.addForm = this._fb.group({
      status_name:['',[Validators.required]],
      status_group_id:['',[Validators.required]],
      master_status_id:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],
    })
  }
  get f() {
    return this.addForm.controls;
  }
  getAllMasterStatus(){
    this.api.getAllMasterStatus().subscribe(
      (resp:any)=>{
        this.allMasterStatus=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllStatusGroup(){
    this.api.getAllStatusGroup().subscribe(
      (resp:any)=>{
        this.allStatusGroup=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postStatus(this.addForm.value).subscribe(
        (resp:any)=>{
          this.dialogRef.close()
        },
        (error:any)=>{
          console.log("error");
          
        }
      )
    }

  }



}
