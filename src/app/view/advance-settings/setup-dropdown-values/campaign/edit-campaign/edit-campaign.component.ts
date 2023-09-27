import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {

  editForm!:FormGroup;
  allSource:any=[]
  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditCampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      campaign_name:['',[Validators.required]],
      source_id:['',[Validators.required]],

    })
    this.getCampiagnbyId()
  this.getAllSource();

  }
  get f() {
    return this.editForm.controls;
  }
  getAllSource(){
    this.api.getAllSource().subscribe(
      (resp:any)=>{
        this.allSource=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getCampiagnbyId(){
    this.api.getCampignById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({campaign_name:resp.result[0].campaign_name})
        this.editForm.patchValue({source_id:resp.result[0].source_id})


      },
      (error:any)=>{

      }
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editCampign(this.id,this.editForm.value).subscribe(
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
