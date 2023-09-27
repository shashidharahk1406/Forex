import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
  editForm!:FormGroup;
  allState:any=[];
  is_metropolitan:boolean=false
  is_checked:boolean=false
  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      name:['',[Validators.required]],
      state_id:['',[Validators.required]],
      is_metro_politan:['',[Validators.required]],

    })
    this.getCitybyId()
    this.getState()

  }
  get f() {
    return this.editForm.controls;
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
  getCitybyId(){
    this.api.getCityById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({name:resp.result[0].name})
        this.editForm.patchValue({state_id:resp.result[0].state_id})
        this.editForm.patchValue({is_metro_politan:resp.result[0].is_metro_politan})
        if(resp.result[0].is_metro_politan==true){
          this.is_metropolitan=true
        }
        else{
          this.is_metropolitan=false
        }


      },
      (error:any)=>{

      }
    )
  }
  onChange(event:any){
    console.log(event.checked);
    this.is_metropolitan=event.checked
    
  }
  edit(){
    this.editForm.patchValue({is_metro_politan:this.is_metropolitan})

    if(this.editForm.invalid){

    }
    else{
      this.api.editCity(this.id,this.editForm.value).subscribe(
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
