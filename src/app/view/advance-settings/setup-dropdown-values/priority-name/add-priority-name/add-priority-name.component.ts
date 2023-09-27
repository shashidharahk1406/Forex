import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-add-priority-name',
  templateUrl: './add-priority-name.component.html',
  styleUrls: ['./add-priority-name.component.css']
})
export class AddPriorityNameComponent implements OnInit {

  addForm!:FormGroup;
  allPriorityGroup:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddPriorityNameComponent>) { }

  ngOnInit(): void {
    this.initFilter()
    this.getPriorityGroup()

  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      priority_group_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
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
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postPriority(this.addForm.value).subscribe(
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
