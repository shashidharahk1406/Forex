import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-add-medium',
  templateUrl: './add-medium.component.html',
  styleUrls: ['./add-medium.component.css']
})
export class AddMediumComponent implements OnInit {
  addForm!:FormGroup;
  allCampaign:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddMediumComponent>,private emit:EmitService) { }

  ngOnInit(): void {
    this.initFilter()
    this.getCampiagn()
  }
  initFilter(){
    this.addForm = this._fb.group({
      medium_name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      campaign_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  getCampiagn(){
    this.api.getAllCampign().subscribe(
      (resp:any)=>{
        this.allCampaign=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postMedium(this.addForm.value).subscribe(
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
