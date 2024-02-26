import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmissionDetailsComponent } from '../admission-details/admission-details.component';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';

@Component({
  selector: 'app-docs-process',
  templateUrl: './docs-process.component.html',
  styleUrls: ['./docs-process.component.css']
})
export class DocsProcessComponent implements OnInit {
  docsProcess!:FormGroup;
  docStatus:any = [
    {
      id:1,
      status:'Pending if any'
    },
    {
      id:2,
      status:'Completed'
    },
   ]
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<DocsProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _baseService:BaseServiceService,
    private api:ApiService,
    private emit:AddLeadEmitterService

    ) { }

  ngOnInit(): void {
    this.initForm()
    this.getDocsProcess()
  }
  initForm(){
    this.docsProcess = this.fb.group({
      docsStatus:['',Validators.required],
      pendingDocs:['']
    })
  }
  getDocsProcess(){
    this._baseService.getByID(`${environment.admission_details}${this.data.user_data.id}/`).subscribe((res:any)=>{
      if(res.result){
       let data= res.result[0]
        this.docsProcess.patchValue({
          docsStatus:Number(data.docs_process),
          pendingDocs:data.pending_docs
        }) 
      }
    },((error:any)=>{
      this.api.showError(error.error.message)
    })
    )
  }
  get f() {
    return this.docsProcess.controls;
  }
  onSubmit(){
    if(this.docsProcess.invalid){
      this.docsProcess.markAllAsTouched()
    }else{
      const formData = this.docsProcess.value
      const data = {
        lead: this.data.user_data.id,
        docs_process: formData.docsStatus,
        pending_docs: formData.pendingDocs
    }
      this._baseService.postData(environment.admission_details,data).subscribe((resp:any)=>{
        if(resp){
          this.api.showSuccess(resp.message)
          this.emit.triggerGet();
          this.dialogRef.close()
        }
      },((error:any)=>{
        this.api.showError(error.error.message)
      }))
    }
  }
  closePopup(){
    this.dialogRef.close()
  }
  clearSelectField(fieldName: string) {
    this.docsProcess.get(fieldName)?.reset();
}
  onFileSelected(event:any){}

}
