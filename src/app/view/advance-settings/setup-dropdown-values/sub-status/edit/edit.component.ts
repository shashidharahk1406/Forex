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
  allReasonGroup:any=[]
  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      sub_status_name:['',[Validators.required]],
      reason_group_id:['',[Validators.required]],

    })
    this.getSubStatusbyId()
  this.getAllReasonGroup();

  }
  get f() {
    return this.editForm.controls;
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
  getSubStatusbyId(){
    this.api.getSubStatusById(this.id).subscribe(
      (resp:any)=>{
        //console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({reason_group_id:resp.result[0].reason_group_id})
        this.editForm.patchValue({sub_status_name:resp.result[0].sub_status_name})


      },
      (error:any)=>{

      }
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editSubStatus(this.id,this.editForm.value).subscribe(
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
