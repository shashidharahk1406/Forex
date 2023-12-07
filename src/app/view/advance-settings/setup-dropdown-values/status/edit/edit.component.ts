import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm!:FormGroup;
  allMasterStatus:any=[]
  allStatusGroup:any=[]
  status_id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditComponent>, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public id: any) {
      this.status_id=id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  get f() {
    return this.editForm.controls;
  }
  initFilter(){
    this.editForm = this._fb.group({
      status_name:['',[Validators.required]],
      status_group_id:['',[Validators.required]],
      master_status_id:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],

    })
    this.getStatusbyId()
    this.getAllMasterStatus();
    this.getAllStatusGroup()
  }
  getStatusbyId(){
    this.api.getStatusById(this.status_id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({status_name:resp.result[0].status_name})
        this.editForm.patchValue({status_group_id:resp.result[0].status_group_id})
        this.editForm.patchValue({master_status_id:resp.result[0].master_status_id})
        this.editForm.patchValue({is_active:resp.result[0].is_active})
        this.editForm.patchValue({is_system_value:resp.result[0].is_system_value})

      },
      (error:any)=>{

      }
    )
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
        console.log(this.allStatusGroup,"array");
        
      },
      (error:any)=>{

      }
      
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editStatus(this.status_id,this.editForm.value).subscribe(
        (resp:any)=>{
          this.emit.sendRefresh(true)
          this.dialogRef.close()
          this.api.showSuccess(this.api.toTitleCase(resp.message))

        },
        (error:any)=>{
          console.log("error");
           this.api.showError(this.api.toTitleCase(error.error.message))

          
        }
      )
    }

  }





}
