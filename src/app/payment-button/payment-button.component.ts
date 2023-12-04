import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form modules
import { CommonServiceService } from '../service/common-service.service';

declare var Razorpay:any;
@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.css']
})
export class PaymentButtonComponent implements OnInit {
  verifyForm!: FormGroup;
  
  payment(){
    const RozarpayOptions = {
      description:'Sample Rozarpay demo',
      currency:'INR',
      amount:30000,
      name:'Asma',
      key:'rzp_test_8QJuav3Zg2fxgz',
      image:'../assets/images/logo.png',
      prefill:{
        name:'Asma M',
        email:'asma@ekfrazo.in',
        phone:'9898989898'
      },
      handler: function(response: any) {
        console.log(response);
        alert(response.razorpay_payment_id);
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
    const successCallback = (paymentid:any)=>{
    console.log(paymentid)
    }
    const failureCallback =(e:any)=>{
      console.log(e)
      }
    Razorpay.open(RozarpayOptions,successCallback,failureCallback)
    // Razorpay.open(RozarpayOptions).then((razpayData: any) => {
    //   console.log(razpayData,"ANY")
    //     const data = {
    //       razorpay_payment_id: razpayData.response.razorpay_payment_id,
    //       razorpay_order_id: razpayData.response.razorpay_order_id,
    //       razorpay_signature: razpayData.response.razorpay_signature,
    //       is_amount_paid: true,
    //       driver_id:localStorage.getItem('driver_id'),
    //       //subscription_id:this.subscription_id
    //     };
    //    // this.showLoading()
    //     // setTimeout(() => {
    //     //   this.api.sendPaymentDetails(data).subscribe(
    //     //     (successData) => {
    //     //       this.router.navigate(['driver/inner/home']);
    //     //       this.loaderDismiss()
    //     //     });
    //     // }, 100);
    //   }).catch((err:any) => {
    //     // console.log(err);
    //     // this.loaderDismiss()
      
    //   });
  }
  // const options = {
  //   key: 'rzp_test_GxaJhvoS78ZpIz',
  //   amount: this.planDetails['amount'],
  //   description: 'Payment',
  //   image: '../../../../../../assets/images/smiley.png',
  
  //   order_id: resp.order_id,//Order ID generated in Step 1
  //   currency: 'INR',
  //   name: 'Logistics',
  //   prefill: {
  //     contact: localStorage.getItem('user_id')
  //   },
  //   theme: {
  //     color: '#3CCCC4'
  //   }
  // };
  // Checkout.open(options).then((razpayData: any) => {

  //   const data = {
  //     razorpay_payment_id: razpayData.response.razorpay_payment_id,
  //     razorpay_order_id: razpayData.response.razorpay_order_id,
  //     razorpay_signature: razpayData.response.razorpay_signature,
  //     is_amount_paid: true,
  //     driver_id:localStorage.getItem('driver_id'),
  //     subscription_id:this.subscription_id
  //   };
  //   this.showLoading()
  //   setTimeout(() => {
  //     this.api.sendPaymentDetails(data).subscribe(
  //       (successData) => {
  //         this.router.navigate(['driver/inner/home']);
  //         this.loaderDismiss()
  //       });
  //   }, 100);
  // }).catch((err) => {
  //   console.log(err);
  //   this.loaderDismiss()
  
  // });
  constructor(private formBuilder: FormBuilder,private commonService:CommonServiceService) {}

  ngOnInit() {
    // Initialize the form with validators
    // this.verifyForm = this.formBuilder.group({
    //   name: ['', [Validators.required,Validators.pattern(this.commonService.namePattern)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required,Validators.pattern(this.commonService.mobilePattern)]],
    //   bankAccountNumber: ['', Validators.required]
    // });
  }

  // Access form controls
  // get formControls() {
  //   return this.verifyForm.controls;
  // }

  verifyAccount() {
    if(this.verifyForm.invalid){
      this.verifyForm.markAllAsTouched()
    }
    else{
      // Perform action when the form is valid
      const formData = this.verifyForm.value;
      console.log('Form Data:', formData);
      // Implement your logic for verifying the account using formData
    } 
  }
}
