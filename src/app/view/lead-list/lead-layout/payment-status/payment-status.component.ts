import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  paymentStatus!:FormGroup;
  docStatus:any = [
    {
      id:1,
      status:'Payment Cleared'
    },
    {
      id:2,
      status:'Payment Pending'
    },
   ]
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AdmissionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.paymentStatus = this.fb.group({
      payStatus:['',Validators.required],
    })
  }
  get f() {
    return this.paymentStatus.controls;
  }
  onSubmit(){}
  closePopup(){
    this.dialogRef.close()
  }
  clearSelectField(fieldName: string) {
    this.paymentStatus.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
