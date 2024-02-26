import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferLeadComponent } from '../refer-lead/refer-lead.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
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
  channels = ["SMS","EMAIL","WHATSAPP"]
  firstFormGroup: any;
  secondFormGroup: any;
  constructor(public dialogRef: MatDialogRef<PaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private emitService:EmitService,
    private emit:AddLeadEmitterService){}

  ngOnInit(): void {
    this.initForm()
  }
 initForm(){
  this.paymentForm = this.fb.group({
    amount:['',[Validators.required]],
    channel:['',[Validators.required]]
  })
 }
  closePopup(){
    this.dialogRef.close()
  }
  get f() {
    return this.paymentForm.controls;
  }
  clearSelectField(fieldName: string) {
    this.paymentForm.get(fieldName)?.reset();
  }
  onSubmit(){
    if(this.paymentForm.invalid){
      this.paymentForm.markAllAsTouched
    }else{
      let formData ={}
      if(this.data.name === "BULK"){ 
      formData ={
        amount:this.paymentForm.value['amount'],
        channel:this.paymentForm.value['channel'],
        lead_ids: this.data.data,
        counsellor_id:6 ,
      } 
    }else{
     
      formData ={
        amount:(this.paymentForm.value['amount']*100),
        channel:this.paymentForm.value['channel'],
        lead_ids: [this.data.user_data.id],
        counsellor_id:6,
      }
    }
      this._baseService.postData(`${environment.leadPayment}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this.closePopup()
          this.emitService.paymentLink()
          this.emit.triggerGet();
        }
      },(error:any)=>{
        this.api.showError(error.error.error.message)
      })
    }
  }
  goBackpayStatus(){
   this.dialogRef.close('Open')
  }
}
