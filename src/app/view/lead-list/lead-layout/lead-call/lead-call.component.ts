import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-call',
  templateUrl: './lead-call.component.html',
  styleUrls: ['./lead-call.component.css']
})
export class LeadCallComponent implements OnInit {
  callLeadForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LeadCallComponent>,
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
