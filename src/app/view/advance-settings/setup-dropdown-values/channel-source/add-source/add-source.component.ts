import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css']
})
export class AddSourceComponent implements OnInit {
  addForm!:FormGroup;
  allSource:any=[]
  allChannel:any=[]
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddSourceComponent>) { }

  ngOnInit(): void {
    this.initFilter()
    this.getAllSourceGroup()
    this.getAllChannel()
  }
  initFilter(){
    this.addForm = this._fb.group({
      source_name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      source_id:['',[Validators.required]],
      channel_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  getAllSourceGroup(){
    this.api.getAllSource().subscribe(
      (resp:any)=>{
        this.allSource=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getAllChannel(){
    this.api.getAllChannel().subscribe(
      (resp:any)=>{
        this.allChannel=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postSource(this.addForm.value).subscribe(
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
