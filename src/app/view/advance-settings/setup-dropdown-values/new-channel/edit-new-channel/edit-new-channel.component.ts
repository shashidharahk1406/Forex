import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-new-channel',
  templateUrl: './edit-new-channel.component.html',
  styleUrls: ['./edit-new-channel.component.css']
})
export class EditNewChannelComponent implements OnInit {

  editForm!:FormGroup;

  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditNewChannelComponent>, private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      new_channel_name:['',[Validators.required]],


    })
    this.getChannelbyId()
  }
  getChannelbyId(){
    this.api.getNewChannelById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({new_channel_name:resp.result[0].new_channel_name})

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
      this.api.editNewChannel(this.id,this.editForm.value).subscribe(
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

