import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-country-id',
  templateUrl: './edit-country-id.component.html',
  styleUrls: ['./edit-country-id.component.css']
})
export class EditCountryIdComponent implements OnInit {

  
  editForm!:FormGroup;

  id:any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditCountryIdComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],


    })
    this.getCountrybyId()
  }
  getCountrybyId(){
    this.api.getCountryById(this.id).subscribe(
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
      this.api.editCountry(this.id,this.editForm.value).subscribe(
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

