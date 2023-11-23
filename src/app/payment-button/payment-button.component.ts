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
      image:'',
      prefill:{
        name:'Asma M',
        email:'asma@ekfrazo.in',
        phone:'9898989898'
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
    const successCallback =(paymentid:any)=>{
    console.log(paymentid)
    }
    const failureCallback =(e:any)=>{
      console.log(e)
      }
      Razorpay.open(RozarpayOptions,successCallback,failureCallback)
  }
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
