import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/API/api.service';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ImageService } from 'src/app/service/image.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  // paymentStatus!:FormGroup;
  editable1 = false;
  editable2 = false;
  editable3 = false;
  admission=[]
  payType:any = ['Cash','Net banking','G-pay','phonepay'];
  admissionStatus = [
    {
     id:1,
     status:'Pending'
    },
    {
     id:2,
     status:'Done'
    }
   ]
  
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
  selectedImage: any;
  type = true;
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<PaymentStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService:BaseServiceService,
    private api:ApiService,
    private imageService: ImageService,
    private _addLeadEmitter:AddLeadEmitterService
    ) { 
      this.initForm()
    }
  
    
   
   
  ngOnInit(): void {
   
    this.getPaymentStatus()
  }
  initForm(){
    // this.paymentStatus = this.fb.group({
    //   payStatus:['',Validators.required],
    // })
    this.firstFormGroup = this.fb.group({
      // firstCtrl: [''],
    });
    this.secondFormGroup = this.fb.group({
      // secondCtrl: [''],
    });
    this.thirdFormGroup = this.fb.group({
      paymentMode:['',Validators.required],
      uploadProof:['',Validators.required],
      admission:['',Validators.required]
    })
  }
  changeType(){
    this.type = true
    this.selectedImage =''
    
  }
  getPaymentStatus() {
    this.baseService.getByID(`${environment.payment_status}${this.data.user_data.id}/`).subscribe((res: any) => {
      if (res) {
        this.selectedStatus = res.result[0].payment_status;
        let formData = res.result[0]
        this.selectInitialStep();
        this.selectedImage = formData.upload_payment_proof
        if(res.result[0]){
          this.thirdFormGroup.patchValue({
            paymentMode: formData.payment_mode,
            admission: +formData.admission_status || '',
            uploadProof: formData.upload_payment_proof
          });
        }
        
        
      }
    }, (error: any) => {
      this.api.showError(error.error.message);
    });
  }
  selectInitialStep() {
    switch (this.selectedStatus) {
      case '1' || 1:
        //this.selectedIndex = 0;
        this.stepper.selectedIndex = 0
        this.updateEditableStatus();
        break;
      case '2' || 2:
        this.selectedIndex = 1; 
        this.stepper.selectedIndex = 1
        this.updateEditableStatus();
        break;
      case '3' || 3:
        this.selectedIndex = 2;
        this.stepper.selectedIndex = 2
        this.updateEditableStatus();
        break;
    }
    //console.log(this.stepper,"STEPPER")
  }
  
  
   updateEditableStatus() {
    this.editable1 = this.selectedStatus == '1' || this.selectedStatus == 1;
    this.editable2 = this.selectedStatus == '2' || this.selectedStatus == 2;
    this.editable3 = this.selectedStatus == '3' || this.selectedStatus == 3;
   }
  
  get f() {
    return this.thirdFormGroup.controls;
  }
  onSubmit(){
    if(this.thirdFormGroup.invalid){
      this.thirdFormGroup.markAllAsTouched()
      this.api.showError('Please Fill The Mandatory Fields')
    }else{
      let formData = this.thirdFormGroup.value
      let data = {
         lead_id: this.data.user_data.id,
         payment_status:"3",
         payment_mode: formData.paymentMode,
         admission_status: formData.admission,
         upload_payment_proof:this.fileUrl
      }
      this.baseService.postData(environment.payment_status,data).subscribe((res:any)=>{
       if(res){
         this.api.showSuccess(res.message)
         this._addLeadEmitter.triggerGet();
         this.dialogRef.close()
       }
      },((error:any)=>{
       this.api.showError(error.error.message)
      }))
    }
   
  }
  onChangeStep(event:any){
    console.log(event,'selectionChange')
    if(event.selectedIndex == 2 ){
      this.selectedTab = true
    }else{
        this.selectedTab = false
    }
  }
  saveAndNext(){
    this.selectedTab = true
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
      this.uploadFile =  event.target.files[0];
      if(event.target.files && event.target.files[0]){
        const reader =new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any)=>{
          this.url = event.target.result;
          this.fileUrl= reader.result
          this.thirdFormGroup.patchValue({uploadProof:this.url})
        }
      }
    }
  
  }
  downloadImage() {
    const imageUrl = this.f['uploadProof'].value;

    this.imageService.downloadImage(imageUrl).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click on it to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
