import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { MatStep, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  paymentStatus!:FormGroup;
  editable1 = false;
  editable2 = false;
  editable3 = false;
  payType:any = ['Cash','Net banking','G-pay','phonepay'];
  admissionStatus:any = ['Done','Inprogress'];
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
  selectedStatus: any;
  //stepCompleted: boolean[] = [false, false, false]; // Set to false initially for all steps
  stepCompleted:any;
  @ViewChild('stepper')stepper!:MatStepper;
  uploadFile: any;
  url: any;
  fileUrl!: string | ArrayBuffer | null;
  selectedTab: boolean = false;
  isLinear = false;
  selectedIndex: number = -1;
  @ViewChildren(MatStep) steps!: QueryList<MatStep>;
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<PaymentStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService:BaseServiceService,
    private api:ApiService
    ) { 
      this.getPaymentStatus()
    }
    getPaymentStatus() {
      this.baseService.getByID(`${environment.payment_status}${this.data.user_data.id}`).subscribe((res: any) => {
        if (res) {
          this.selectedStatus = res.result[0].payment_status;
          this.selectInitialStep();
        }
      }, (error: any) => {
        this.api.showError(error.error.message);
      });
    }
    
    selectInitialStep() {
      switch (this.selectedStatus) {
        case '1' || 1:
          this.selectedIndex = 0;
          //  this.stepper.selectedIndex = 0
          this.updateEditableStatus();
          break;
        case '2' || 2:
          this.selectedIndex = 1; 
          // this.stepper.selectedIndex = 1
          this.updateEditableStatus();
          break;
        case '3' || 3:
          this.selectedIndex = 2;
         // this.stepper.selectedIndex = 2
          this.updateEditableStatus();
          break;
      }
      console.log(this.stepper,"STEPPER")
    }
    
    
     updateEditableStatus() {
      this.editable1 = this.selectedStatus == '1' || this.selectedStatus == 1;
      this.editable2 = this.selectedStatus == '2' || this.selectedStatus == 2;
      this.editable3 = this.selectedStatus == '3' || this.selectedStatus == 3;
     }
    // ngAfterViewInit(){
    //   this.getPaymentStatus()
    // }
    ngOnChanges(){
      this.getPaymentStatus()
    }
  ngOnInit(): void {
    this.initForm()
    //console.log(this.stepper.selectedIndex)
  }
  initForm(){
    this.paymentStatus = this.fb.group({
      payStatus:['',Validators.required],
    })
    this.firstFormGroup = this.fb.group({
      // firstCtrl: [''],
    });
    this.secondFormGroup = this.fb.group({
      // secondCtrl: [''],
    });
    this.thirdFormGroup = this.fb.group({
      paymentMode:['',Validators.required],
      uploadProof:['',Validators.required],
      admissionStatus:['',Validators.required]
    })
  }
 

  get f() {
    return this.thirdFormGroup.controls;
  }
  onSubmit(){
    if( this.thirdFormGroup.invalid){
      this.thirdFormGroup.markAllAsTouched()
      this.api.showError('Invalid Form')
    }else{
      let formData = this.thirdFormGroup.value
      let data = {
         lead_id: this.data.user_data.id,
         payment_status:"3",
         payment_mode: formData.paymentMode,
         admission_status: formData.admissionStatus,
         upload_payment_proof:this.fileUrl
      }
      this.baseService.postData(environment.payment_status,data).subscribe((res:any)=>{
       if(res){
         this.api.showSuccess(res.message)
         this.dialogRef.close()
       }
      },((error:any)=>{
       this.api.showError(error.error.message)
      }))
    }
   
  }
  onChangeStep(event:any){
    // console.log(event.target.value,event.target.innerText,"EVENT STEP")
    console.log(event.target.completed,"COMPLETED",this.stepper._getStepLabelId)
    if(event.target.innerText === 'Completed' || event.target.innerText === '3\nCompleted'){
      this.selectedTab = true
    }else{
      this.selectedTab = false
    }
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
onFileSelected(event:any){
  if(event){
    this.uploadFile=  event.target.files[0];
    if(event.target.files && event.target.files[0]){
      const reader =new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any)=>{
        this.url = event.target.result;
        this.fileUrl= reader.result
        // this.thirdFormGroup.patchValue({leadUpload:this.url})
      }
    }
  }
 
}

}
