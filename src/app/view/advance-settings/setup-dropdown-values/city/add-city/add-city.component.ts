import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddCityComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
    this.getState()

  }
  initFilter(){
    this.addForm = this._fb.group({
      name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      state_id:['',[Validators.required]],
      is_metro_politan:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  onChange(event:any){
    console.log(event.checked);
    this.is_metropolitan=event.checked
    
  }
  getState(){
    this.api.getAllState().subscribe(
      (resp:any)=>{
        this.allState=resp.results
      },
      (error:any)=>{

      }
      
    )
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
          console.log(error);
           this.api.showError(this.api.toTitleCase(error.error.message))
        }
      )
    }

  }


}
