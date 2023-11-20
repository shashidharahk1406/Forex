import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferLeadComponent } from '../refer-lead/refer-lead.component';
import { FormGroup } from '@angular/forms';
declare var Razorpay:any;
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm!:FormGroup;
  smsChecked: boolean = false;
  emailChecked: boolean = false;
  whatsappChecked: boolean = false;
  constructor(public dialogRef: MatDialogRef<ReferLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
  }
 
  closePopup(){
    this.dialogRef.close()

  }
}
