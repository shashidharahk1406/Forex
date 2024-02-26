import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.css']
})
export class EditSourceComponent implements OnInit {
  editForm!:FormGroup;
  allSource:any=[]
  allChannel:any=[]
  id:any;


  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditSourceComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  get f() {
    return this.editForm.controls;
  }
  initFilter(){
    this.editForm = this._fb.group({
      source_name:['',[Validators.required]],
      source_id:['',[Validators.required]],
      channel_id:['',[Validators.required]],
    })
    this.getSourcebyId()
    this.getAllSourceGroup()
    this.getAllChannel()
  }
  getSourcebyId(){
    this.api.getSourceById(this.id).subscribe(
      (resp:any)=>{
        //console.log(resp.result[0].source_id);
        this.editForm.patchValue({source_name:resp.result[0].source_name})
        this.editForm.patchValue({source_id:resp.result[0].source_id})
        this.editForm.patchValue({channel_id:resp.result[0].channel_id})

      },
      (error:any)=>{

      }
    )
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
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editSource(this.id,this.editForm.value).subscribe(
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
