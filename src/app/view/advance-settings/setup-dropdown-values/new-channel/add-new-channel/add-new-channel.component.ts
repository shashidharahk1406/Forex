import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-add-new-channel',
  templateUrl: './add-new-channel.component.html',
  styleUrls: ['./add-new-channel.component.css']
})
export class AddNewChannelComponent implements OnInit {
  addForm!:FormGroup;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddNewChannelComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.addForm = this._fb.group({
      new_channel_name:['',[Validators.required]],
      is_active:[true],
      is_system_value:[true],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postNewChannel(this.addForm.value).subscribe(
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

