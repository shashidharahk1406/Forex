import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { DataService } from 'src/app/service/data.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-payment-details',
  templateUrl: './customer-payment-details.component.html',
  styleUrls: ['./customer-payment-details.component.css']
})
export class CustomerPaymentDetailsComponent implements OnInit {
  paymentForm!:FormGroup;
  smsChecked: boolean = false;
  emailChecked: boolean = false;
  whatsappChecked: boolean = false;
  channels = ["SMS","EMAIL","WHATSAPP"]
  firstFormGroup: any;
  secondFormGroup: any;
  user_id: any;
  constructor(public dialogRef: MatDialogRef<CustomerPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private emitService:EmitService,
    private emit:AddLeadEmitterService,
    private _commonService:CommonServiceService,
  private dataService:DataService ){}
    @Output()refresh = new EventEmitter()
    isFiltered:any
  ngOnInit(): void {
    this.initForm()
    this.user_id = localStorage.getItem('user_id')


    this.dataService.filterCustomerRefreshdataSubject.subscribe((res: any) => {
      console.log(res, 'filter');

      this.isFiltered = res;
    });
  }
 initForm(){
  this.paymentForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern(this._commonService.amountPattern)]],
    channel:['',[Validators.required]]
  })
 }
  closePopup(){
    this.dialogRef.close(false)
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
        amount:parseInt(this.paymentForm.value['amount']),
        channel:this.paymentForm.value['channel'],
        lead_ids: this.data.data,
        counsellor_id:this.user_id,
      } 
    }else{
      formData ={
        amount:parseInt(this.paymentForm.value['amount']),
        channel:this.paymentForm.value['channel'],
        lead_ids: [this.data.user_data.id],
        counsellor_id:this.user_id,
      }
    }
      this._baseService.postData(`${environment.leadPayment}`,formData).subscribe((res:any)=>{
        if(res){
          this.api.showSuccess(res.message)
          // this.closePopup()
          this.dialogRef.close(true)
          if(this.isFiltered==true){
            this.refresh.emit(false)
          }
          
          this.emitService.paymentLink()
          this.refresh.emit(true)
          this.emit.customerFiltertriggerGet();
        }
      },(error:any)=>{
        this.api.showError(error.error.message)
      })
    }
  }
  goBackpayStatus(){
   this.dialogRef.close('Open')
  }

}
