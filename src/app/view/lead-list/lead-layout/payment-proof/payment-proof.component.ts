import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';

@Component({
  selector: 'app-payment-proof',
  templateUrl: './payment-proof.component.html',
  styleUrls: ['./payment-proof.component.css']
})
export class PaymentProofComponent implements OnInit {
  payType:any = ['Cash','Net banking','G-pay','phonepay'];
  paymentProof!:FormGroup;
  admissionStatus:any = ['Done','Inprogress'];
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AdmissionDetailsComponent>,
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
