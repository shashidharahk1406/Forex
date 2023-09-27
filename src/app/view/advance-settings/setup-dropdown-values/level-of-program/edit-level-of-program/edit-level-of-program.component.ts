import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-edit-level-of-program',
  templateUrl: './edit-level-of-program.component.html',
  styleUrls: ['./edit-level-of-program.component.css']
})
export class EditLevelOfProgramComponent implements OnInit {
  
  editForm!:FormGroup;

  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditLevelOfProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],


    })
    this.getLevelbyId()
  }
  getLevelbyId(){
    this.api.getLevelOfProgramById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})

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
      this.api.editLevelOfProgram(this.id,this.editForm.value).subscribe(
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

