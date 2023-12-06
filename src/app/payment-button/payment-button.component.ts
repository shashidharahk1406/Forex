import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form modules

import { HttpClient } from '@angular/common/http';
import { RazorpayService } from '../service/razorpay.service';
import { ApiService } from '../service/API/api.service';
import { BaseServiceService } from '../service/base-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

declare var Razorpay:any;
@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.css']
})
export class PaymentButtonComponent implements OnInit {
  verifyForm!: FormGroup;
  orderId!: string;
  paymentId!: string;
  paymentStatus!: string;
  btnEnable: boolean = false;
  data:any = {}
  email: any;
  leadId: any;
  counsellorId: any;
  amount: any;
  constructor(private baseService:BaseServiceService,private api:ApiService,
    private router:Router,
    private route: ActivatedRoute) {}

 
  payment(){
    alert(this.amount)
   
    const RazarpayOptions:any = {
      description:'Sample Rozarpay demo',
      currency:'INR',
      amount:this.amount,
      name:'Asma',
      key:'rzp_test_SGLqA6ORuQPThF',
      image:'../assets/images/logo.png',
      order_id:this.orderId,
      prefill:{
        name:'Asma M',
        email:'asma@ekfrazo.in',
        phone:'9898989898'
      },
      handler: function(response: any):any {
         if(response){
         
           console.log(response)
           successCallback(response)
         }
      },
      
      theme:{
        color:'#f37254'
      },
      modal:{
        ondismiss:()=>{
          console.log('dismissed')
        }
      }

    }
    const successCallback = (response:any)=>{
      console.log("SUCCESS CALLBACK", response)
      this.postPaymentDetails(response)
      
    }
    const failureCallback =(e:any)=>{
      // console.log(e)
      if(e){
        this.btnEnable = false
      }
      }
      
    Razorpay.open(RazarpayOptions,successCallback)
    
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params){
        this.email = params['email'];
        this.leadId = Number(params['lead_id']);
        this.counsellorId =  2
        this.amount = (params['amount']*100);
        this.orderId = params['order_id'];
        
       
      }
      
    });
    
  }
  postPaymentDetails(response:any){
       const data ={
        razorpay_payment_id:response.razorpay_payment_id,
        razorpay_order_id:response.razorpay_order_id,
        razorpay_signature:response.razorpay_signature,
        lead_id:this.leadId,
        counsellor_id:this.counsellorId,
        is_clicked:true,
        is_paid:true,
        email: this.email,
        mobile_number:9845123453,
       }
        this.baseService.postData(`${environment.paymentDetails}`,data).subscribe((resp:any)=>{
          if(resp){
            this.btnEnable = true
            setTimeout(() => {
              this.api.showSuccess(resp.message)
             // this.router.navigate(['/transaction'])
            }, 500);
          }
         },((error:any)=>{
          this.api.showError(error.error.message)
          this.btnEnable = false
         }))
    
  
  }
  
}
