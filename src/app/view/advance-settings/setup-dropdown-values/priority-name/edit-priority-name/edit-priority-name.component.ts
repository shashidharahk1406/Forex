import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-priority-name',
  templateUrl: './edit-priority-name.component.html',
  styleUrls: ['./edit-priority-name.component.css']
})
export class EditPriorityNameComponent implements OnInit {
  editForm!:FormGroup;
  allPriorityGroup:any=[]

  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditPriorityNameComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],
      priority_group_id:['',[Validators.required]],

    })
    this.getPriorityNamebyId()
  this.getPriorityGroup();

  }
  get f() {
    return this.editForm.controls;
  }
  getPriorityGroup(){
    this.api.getAllPriorityGroup().subscribe(
      (resp:any)=>{
        this.allPriorityGroup=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getPriorityNamebyId(){
    this.api.getPriorityById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})
        this.editForm.patchValue({priority_group_id:resp.result[0].priority_group_id})


      },
      (error:any)=>{

      }
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editPriority(this.id,this.editForm.value).subscribe(
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
