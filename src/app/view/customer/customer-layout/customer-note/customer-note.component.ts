import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.css']
})
export class CustomerNoteComponent implements OnInit {

  leadNoteForm!:FormGroup;
  user_id:any;
  constructor(
    public dialogRef: MatDialogRef<CustomerNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _commonService:CommonServiceService,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private addEmit:AddLeadEmitterService) {
      this.user_id = localStorage.getItem('user_id')
      this.getNotes()
     }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
  this.leadNoteForm = this._fb.group({
    leadNote:['',Validators.required]
  })
  }
  get f() {
    return this.leadNoteForm.controls;
  }
  submit(){
    if(this.leadNoteForm.invalid){
      this.leadNoteForm.markAllAsTouched()
    }else{
    let f = this.leadNoteForm.value
    let obj = {
        note_name:f.leadNote,
        lead : this.data,
        updated_note_by:this.user_id 
    }
    this._baseService.postData(environment.lead_note,obj).subscribe((res:any)=>{
      if(res){
        this.api.showSuccess(res.message)
        this.addEmit.triggerGet()
        this.dialogRef.close()
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
}
  getNotes(){
   this._baseService.getByID(`${environment.lead_note}?lead_id=${this.data}`).subscribe((res:any)=>{
    if(res.result){
      let formData = res.result[0]
      this.leadNoteForm.patchValue({
        leadNote:formData.note_name
      })
    }
   },((error:any)=>{
    // this.api.showError(error.error.message)
   })) 
  }

}
