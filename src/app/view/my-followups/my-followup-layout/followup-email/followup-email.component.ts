import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { log } from 'console';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followup-email',
  templateUrl: './followup-email.component.html',
  styleUrls: ['./followup-email.component.css']
})
export class FollowupEmailComponent implements OnInit {

  @Input()selectedId:any;
  emailForm!: FormGroup;
  templateList: any;
  basicTemplate: any;
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService) {
     
    }

  ngOnInit(): void {
    console.log(this.data,"selected data")

   
    
    this.initForm();
    this.getTemplate();
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
      // this.api.showError("Invalid Form")
    }
    else{
      const fd = this.emailForm.value;
      let emailFormVal:any = {}
      if(this.data.checked){
         emailFormVal ={
          all_users: true, 
          subject: fd.subject,
          message: fd.followupComment,
          template_id: fd.emailTemplate,
          template_type_id:5
         }
      }else{
        if(this.data.selectedData?.length > 1 ){
           emailFormVal ={
            all_users: false,
            lead_list_ids: this.data.selectedData, 
            subject: fd.subject,
            message: fd.followupComment,
            template_id: fd.emailTemplate,
            template_type_id:5
           }
        }else{
           emailFormVal ={
            all_users: false,
            lead_list_ids: this.data.selectedData, 
            subject: fd.subject,
            message: fd.followupComment,
            template_id: fd.emailTemplate,
            template_type_id:5
           }
        }
        
      }
      
      this._baseService.postData(environment.lead_email,emailFormVal).subscribe((res:any)=>{
        if(res){
          this._bottomSheetRef.dismiss()
          this.api.showSuccess(res.message)
          
        }
      },((error)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
      }))
    }
    
    
   
  }
  
  closePopup(){
    this._bottomSheetRef.dismiss() 
  }
  getTemplate(){
    this._baseService.getData(`${environment.whatsapp_template}`).subscribe((res:any)=>{
    console.log(res,"whatsapp template");
    
      if(res.results){
        this.templateList = res.results
        console.log(this.templateList," this.templateList")
      }
    })
  }
  onChanges(item:any,template:any){
    this.basicTemplate = '';
   if(template && item){
     if(item.id === template){
      this.basicTemplate = `#Hi# ${item.message} #first_name#`
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