import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/common-service.service';

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
    private _commonService:CommonServiceService) { }

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
}
