import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followup-payment-details',
  templateUrl: './followup-payment-details.component.html',
  styleUrls: ['./followup-payment-details.component.css']
})
export class FollowupPaymentDetailsComponent implements OnInit {

  paymentForm!:FormGroup;
  smsChecked: boolean = false;
  emailChecked: boolean = false;
  whatsappChecked: boolean = false;
  channels = ["SMS","EMAIL","WHATSAPP"]
  firstFormGroup: any;
  secondFormGroup: any;
  constructor(public dialogRef: MatDialogRef<FollowupPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private emitService:EmitService){}

  ngOnInit(): void {
    this.initForm()
  }
 initForm(){
  this.paymentForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
    channel:['',[Validators.required]]
  })
 }
  closePopup(){
    this.dialogRef.close(true)
  }
  get f() {
    return this.paymentForm.controls;
  }
  clearSelectField(fieldName: string) {
    this.paymentForm.get(fieldName)?.reset();
  }
  onSubmit(){
    if(this.paymentForm.invalid){
      this.paymentForm.markAllAsTouched()
    }else{
      let formData ={}
      if(this.data.name === "BULK"){
      
      formData ={
        amount:this.paymentForm.value['amount'],
        channel:this.paymentForm.value['channel'],
        lead_ids: this.data.data,
        counsellor_id:[2] ,
      } 
    }else{
      formData ={
        amount:(this.paymentForm.value['amount']*100),
        channel:this.paymentForm.value['channel'],
        lead_ids: [this.data.user_data.id],
        counsellor_id:[2] ,
      }
    }
    //console.log(formData,"FORMDATA")
      this._baseService.postData(`${environment.leadPayment}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          this.closePopup()
          this.emitService.paymentLink()
        }
      },(error:any)=>{
        this.api.showError(error.error.error.message)
      })
    }
  }
  


  validateKeyPress(event: KeyboardEvent) {
    // Prevent entry of '-' (minus sign)
    if (event.key === '-' || event.key === '+' || event.key==='e') {
      event.preventDefault();
    }
  }
}
