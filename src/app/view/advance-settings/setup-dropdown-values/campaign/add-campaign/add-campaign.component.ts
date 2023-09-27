import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';


@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {
  addForm!:FormGroup;
  allSource:any=[]

  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<AddCampaignComponent>) { }

  ngOnInit(): void {
    this.initFilter()
    this.getSource()

  }
  initFilter(){
    this.addForm = this._fb.group({
      campaign_name:['',[Validators.required]],
      is_active:[true,[Validators.required]],
      is_system_value:[true,[Validators.required]],
      source_id:['',[Validators.required]],

    })
  }
  get f() {
    return this.addForm.controls;
  }
  getSource(){
    this.api.getAllSource().subscribe(
      (resp:any)=>{
        this.allSource=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  submit(){
    if(this.addForm.invalid){

    }
    else{
      this.api.postCampign(this.addForm.value).subscribe(
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
