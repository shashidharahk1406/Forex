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
  editable = false;
  payType:any = ['Cash','Net banking','G-pay','phonepay'];
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
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<PaymentStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.paymentStatus = this.fb.group({
      payStatus:['',Validators.required],
    })
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      paymentMode:['',Validators.required],
      uploadProof:['',Validators.required],
    })
  }
  get f() {
    return this.thirdFormGroup.controls;
  }
  onSubmit(){
    // if(this.paymentStatus.invalid){
    //   this.paymentStatus.markAllAsTouched()
    // }else{
    //   if(this.paymentStatus.value.payStatus == 3 || this.paymentStatus.value.payStatus == 2){
    //     this.dialogRef.close(2)
    //   }
     
    // }
    
  }
  sendLink(){
    this.dialogRef.close(2)
  }
  
  closePopup(){
    
    this.dialogRef.close(0)
  }
  clearSelectField(fieldName: string) {
    this.thirdFormGroup.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
