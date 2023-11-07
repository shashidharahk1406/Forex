import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lead-note',
  templateUrl: './lead-note.component.html',
  styleUrls: ['./lead-note.component.css']
})
export class LeadNoteComponent implements OnInit {
  leadNoteForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LeadNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _commonService:CommonServiceService,
    private _baseService:BaseServiceService,
    private api:ApiService) { }

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
        lead : this.data 
    }
    this._baseService.postData(environment.lead_note,obj).subscribe((res:any)=>{
      if(res){
        this.api.showSuccess(res.message)
      }
    },((error)=>{
      this.api.showError(error.error.message)
    }))
  }
}
}
