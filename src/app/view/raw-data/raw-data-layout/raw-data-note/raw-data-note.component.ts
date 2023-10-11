import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/common-service.service';
@Component({
  selector: 'app-raw-data-note',
  templateUrl: './raw-data-note.component.html',
  styleUrls: ['./raw-data-note.component.css']
})
export class RawDataNoteComponent implements OnInit {
  leadNoteForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RawDataNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder,
    private _commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
  this.leadNoteForm = this._fb.group({
    fullName:['',[Validators.required,this._commonService.nameValidator()]],
    leadNote:['',Validators.required]
  })
  }
  get f() {
    return this.leadNoteForm.controls;
  }
}
