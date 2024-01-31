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
  payStatus:any = [
    {
      id:1,
      status:'Payment Cleared'
    },
    {
      id:2,
      status:'Payment Pending'
    },
    {
      id:3,
      status:'Inprogress'
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
  onSubmit(){
    if(this.paymentStatus.invalid){
      this.paymentStatus.markAllAsTouched()
    }else{
      if(this.paymentStatus.value.payStatus == 3 || this.paymentStatus.value.payStatus == 2)
      this.dialogRef.close('sendPayLink')
    }
    
  }
  closePopup(){
    this.dialogRef.close()
  }
  clearSelectField(fieldName: string) {
    this.paymentStatus.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
