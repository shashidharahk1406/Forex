import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.css']
})
export class EditChannelComponent implements OnInit {

  editForm!:FormGroup;

  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditChannelComponent>, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      channel_name:['',[Validators.required]],


    })
    this.getChannelbyId()
  }
  getChannelbyId(){
    this.api.getChannelById(this.id).subscribe(
      (resp:any)=>{
        //console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({channel_name:resp.result[0].channel_name})

      },
      (error:any)=>{

      }
    )
  }
  get f() {
    return this.editForm.controls;
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editChannel(this.id,this.editForm.value).subscribe(
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

