import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
@Component({
  selector: 'app-edit-medium',
  templateUrl: './edit-medium.component.html',
  styleUrls: ['./edit-medium.component.css']
})
export class EditMediumComponent implements OnInit {
  editForm!:FormGroup;
  allCampaign:any=[]
  id:any;
  constructor(private _fb:FormBuilder,private api:ApiService,public dialogRef: MatDialogRef<EditMediumComponent>,private emit:EmitService,
    @Inject(MAT_DIALOG_DATA) public _id: any) {
      this.id=_id
      
     }

  ngOnInit(): void {
    this.initFilter()
  }
  initFilter(){
    this.editForm = this._fb.group({
      medium_name:['',[Validators.required]],
      campaign_id:['',[Validators.required]],

    })
    this.getMediumbyId()
  this.getAllCampaign();

  }
  get f() {
    return this.editForm.controls;
  }
  getAllCampaign(){
    this.api.getAllCampign().subscribe(
      (resp:any)=>{
        this.allCampaign=resp.results
      },
      (error:any)=>{

      }
      
    )
  }
  getMediumbyId(){
    this.api.getMediumById(this.id).subscribe(
      (resp:any)=>{
        console.log(resp.result[0].status_group_id);
        this.editForm.patchValue({medium_name:resp.result[0].medium_name})
        this.editForm.patchValue({campaign_id:resp.result[0].campaign_id})


      },
      (error:any)=>{

      }
    )
  }
  edit(){
    if(this.editForm.invalid){

    }
    else{
      this.api.editMedium(this.id,this.editForm.value).subscribe(
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
