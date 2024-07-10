import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.css']
})
export class CustomerEmailComponent implements OnInit {

  @Input()selectedId:any;
  emailForm!: FormGroup;
  templateList: any;
  basicTemplate: any;
  @Output()refresh = new EventEmitter()
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<CustomerEmailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private addEmit:AddLeadEmitterService,
    private bottomSheet:MatBottomSheet,
  private dataService:DataService) {

     console.log(data,"data lead email")
    }
    isFiltered:any
  ngOnInit(): void {
    this.initForm();
    this.getTemplate()

    this.dataService.filterCustomerRefreshdataSubject.subscribe((res: any) => {
      console.log(res, 'filter');

      this.isFiltered = res;
    });
  }
 
  initForm(){
    this.emailForm = this.fb.group({
      emailTemplate: ['',Validators.required],
      subject: ['', Validators.required],
      followupComment:['',Validators.required],
    });
  }
  get f() {
    return this.emailForm.controls;
  }

  clearSelectField(fieldName: string) {
    this.emailForm.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched()
    }
    else{
      const fd = this.emailForm.value;
      let emailFormVal:any = {}
      if(this.data.allChecked){
         emailFormVal ={
          all_users: true, 
          lead_list_ids: this.data.bulkIds,
          subject: fd.subject,
          message: fd.followupComment,
          template_id: fd.emailTemplate,
          template_type_id:5
         }
      }else{
        if(this.data.bulkIds?.length > 0 ){
           emailFormVal ={
            all_users: false,
            lead_list_ids: this.data.bulkIds, 
            subject: fd.subject,
            message: fd.followupComment,
            template_id: fd.emailTemplate,
            template_type_id:5
           }
        }else{
           emailFormVal ={
            all_users: false,
            lead_list_ids: [this.data?.selectedData?.user_data?.id], 
            subject: fd.subject,
            message: fd.followupComment,
            template_id: fd.emailTemplate,
            template_type_id:5
           }
        }
        
      }
      
      this._baseService.postData(environment.lead_email,emailFormVal).subscribe((res:any)=>{
        if(res){
         
          this.api.showSuccess(res.message)
          this._bottomSheetRef.dismiss(true)

          if(this.isFiltered==true){
            this.refresh.emit(false)
          }
          else{
            this.addEmit.customerFiltertriggerGet()
            // this.refresh.emit(true)
          }
         
          // 
        }
      },((error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }
    
    
   
  }
  
  closePopup(){
    this._bottomSheetRef.dismiss() 
  }
  getTemplate(){
    this._baseService.getData(`${environment.whatsapp_template}`).subscribe((res:any)=>{
      if(res.results){
        this.templateList = res.results
      }
    })
  }
  onChanges(item:any,template:any){
    this.basicTemplate = '';
   if(template && item){
     if(item.id === template){
      this.basicTemplate = `${item.message}`
      // Check if the followupComment contains hash symbols (#)
      // Use a regular expression to identify and wrap text within hash symbols with read-only attributes
      // const modifiedValue =  this.basicTemplate.replace(/#(.*?)#/g, (match: any, content: any) => {
      //   return `<span class="non-editable" contenteditable="false">${match}</span>`;
      // });
      this.emailForm.patchValue({
        followupComment:this.basicTemplate
      })
     
    
    }
   }
  }
  onInput(event: any) {
    const textarea = event.target;
    const value = textarea.value;
  
   
  }

}
