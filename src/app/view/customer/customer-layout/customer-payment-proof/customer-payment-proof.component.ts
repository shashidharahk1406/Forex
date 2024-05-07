import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerPaymentDetailsComponent } from '../customer-payment-details/customer-payment-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-payment-proof',
  templateUrl: './customer-payment-proof.component.html',
  styleUrls: ['./customer-payment-proof.component.css']
})
export class CustomerPaymentProofComponent implements OnInit {
  payType:any = ['Cash','Net banking','G-pay','phonepay'];
  paymentProof!:FormGroup;
  admissionStatus:any = ['Done','Inprogress'];
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<CustomerPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.paymentProof = this.fb.group({
      paymentMode:['',Validators.required],
      uploadProof:['',Validators.required],
    })
  }
  get f() {
    return this.paymentProof.controls;
  }
  onSubmit(){
    if(this.paymentProof.invalid){
      this.paymentProof.markAllAsTouched()
    }else{
      //Post DATA
    }
  }
  closePopup(){
    this.dialogRef.close()
  }
  clearSelectField(fieldName: string) {
    this.paymentProof.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
