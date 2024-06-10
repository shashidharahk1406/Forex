import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  addForm!:FormGroup;
  allState:any=[]
  is_metropolitan:boolean=false
  state_id: any;
  constructor(private _fb:FormBuilder,private api:ApiService,
    public dialogRef: MatDialogRef<AddCityComponent>,
    private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.state_id = this.data 
    this.initFilter()
  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      state_id:[this.state_id,[Validators.required]],
    })
  }
  get f() {
    return this.addForm.controls;
  }
  
  
  submit(){
    this.addForm.patchValue({is_metro_politan:this.is_metropolitan})
    if(this.addForm.invalid){

    }
    else{
      this.api.postCity(this.addForm.value).subscribe(
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
