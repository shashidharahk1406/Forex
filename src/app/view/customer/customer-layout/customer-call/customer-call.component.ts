import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-call',
  templateUrl: './customer-call.component.html',
  styleUrls: ['./customer-call.component.css']
})
export class CustomerCallComponent implements OnInit {

  callLeadForm!:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CustomerCallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb:FormBuilder) { 
    
     
    }

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
