import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ImageService } from 'src/app/service/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admission-details',
  templateUrl: './admission-details.component.html',
  styleUrls: ['./admission-details.component.css']
})
export class AdmissionDetailsComponent implements OnInit {
  admissionDetailsForm!:FormGroup;
  uploadFile: any;
  url: any;
  fileUrl: string | ArrayBuffer | null | undefined;
  
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AdmissionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private imageService: ImageService,
    private emit:AddLeadEmitterService,
    private commonService:CommonServiceService
    ) { }

  ngOnInit(): void {
    this.initForm()
    this.getAdmissionDetails()
  }
  initForm(){
    this.admissionDetailsForm = this.fb.group({
      applicationNumber:['',[Validators.required,Validators.pattern(this.commonService.amountPattern)]],
      leadUpload:['',Validators.required]
    })
  }
  getAdmissionDetails(){
      this._baseService.getByID(`${environment.admission_details}${this.data.user_data.id}/`).subscribe((res:any)=>{
        if(res.result){
          let data = res.result[0]
          this.admissionDetailsForm.patchValue({
          applicationNumber:data.application_number,
          leadUpload:data.application_soft_copy
        })
        }
      },((error:any)=>{
        this.api.showError(error.error.message)
      }))
    }
   
  get f() {
    return this.admissionDetailsForm.controls;
  }
  onSubmit(){
    if(this.admissionDetailsForm.invalid){
      this.admissionDetailsForm.markAllAsTouched()
    }else{
      const formData =this.admissionDetailsForm.value
      const data = {
        lead: this.data.user_data.id,
        application_number: formData.applicationNumber,
        application_soft_copy: this.fileUrl
      }
      
      this._baseService.postData(environment.admission_details,data).subscribe((resp:any)=>{
        if(resp){
          this.api.showSuccess(resp.message)
          sessionStorage.setItem('admissionDetails','done')
          this.emit.triggerGet();
          this.dialogRef.close()
        }
      },(error:any)=>{
        this.api.showError(error.error.message)
      })
    }
  }
  closePopup(){
    this.dialogRef.close()
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
         this.admissionDetailsForm.patchValue({leadUpload:this.url})
        }
      }
    }
   
  }
  downloadImage() {
    const imageUrl = this.f['leadUpload'].value;

    this.imageService.downloadImage(imageUrl).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);

      // Create a link element and click on it to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
