import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-raw-data-call',
  templateUrl: './raw-data-call.component.html',
  styleUrls: ['./raw-data-call.component.css']
})
export class RawDataCallComponent implements OnInit {
  callLeadForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RawDataCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
  this.callLeadForm = this._fb.group({
    selection:[''],
    agree:['']
  })
  }
}

