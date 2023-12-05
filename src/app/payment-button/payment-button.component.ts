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
  convertedAmount:any;
  constructor(private baseService:BaseServiceService,private api:ApiService,
    private router:Router,
    private route: ActivatedRoute) {}

 
  payment(){
    const RazarpayOptions:any = {
      description:'Sample Rozarpay demo',
      currency:'INR',
      amount:this.convertedAmount,
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
        //   this.data ={
        //     razorpay_payment_id:response.razorpay_payment_id,
        //     razorpay_order_id:"dgfjguusriouip0000000sukfu"
        //    }
           this.btnEnable = true
          
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
   //   this.postPaymentDetails(response)
       this.onSuccessCallback(response)
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
      this.email = params['email'];
      this.leadId = params['lead_id'];
      this.counsellorId =  2
      this.amount = params['amount'];
      this.orderId = params['order_id'];

      // Now you have access to the data from the URL
      console.log('Email:', this.email);
      console.log('Lead ID:', this.leadId);
      console.log('Counsellor ID:', this.counsellorId);
      console.log('Amount:', this.amount);
      console.log('Order ID:', this.orderId);

     
    });
    this.convertedAmount = this.amount*100
  }
  postPaymentDetails(response:any){
       const data ={
        razorpay_payment_id:response.razorpay_payment_id,
        razorpay_order_id:this.orderId,
        razorpay_signature:response.razorpay_signature,
        lead_id:this.leadId,
        counsellor_id:this.counsellorId,
        is_clicked:true,
        is_paid:true,
        email: this.email,
        mobile_number:9888665543,
        status:"pending"
       }
        this.baseService.postData(`${environment.paymentDetails}`,data).subscribe((resp:any)=>{
          if(resp){
            this.api.showSuccess(resp.message)
            
            this.btnEnable = true
            setTimeout(() => {
              this.router.navigate(['/transaction'])
            }, 500);
          }
         },((error:any)=>{
          this.api.showError(error.error.message)
          this.btnEnable = false
         }))
    
  
  }
  @HostListener('click', ['$event'])
  onSuccessCallback(event: Event) {
    // Handle the click event on the host element
    console.log('Host element clicked!', event);
    // Add your logic here
  }
}
