import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-list-call',
  templateUrl: './application-list-call.component.html',
  styleUrls: ['./application-list-call.component.css']
})
export class ApplicationListCallComponent implements OnInit {

  callLeadForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ApplicationListCallComponent>,
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
