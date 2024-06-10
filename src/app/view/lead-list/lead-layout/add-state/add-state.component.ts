import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {

  addForm!:FormGroup;
  allCountry:any=[]
  country_id: any;

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddStateComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

 
  ngOnInit(): void {
   
    this.country_id = this.data
    this.initFilter()
    
  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      country_id:[this.country_id,[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
 
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postState(this.addForm.value).subscribe(
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
