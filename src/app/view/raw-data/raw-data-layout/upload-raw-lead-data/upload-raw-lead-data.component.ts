import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-upload-raw-lead-data',
  templateUrl: './upload-raw-lead-data.component.html',
  styleUrls: ['./upload-raw-lead-data.component.css']
})
export class UploadRawLeadDataComponent implements OnInit {
  uploadLeadForm!:FormGroup

  channelList:any = [];
  sourceList:any = [];
  priorityList:any = [];
  
  statusList:any = [];
  referedToList:any = [
    {
      id:1,
      name:'Rohith'
    },
    {
      id:2,
      name:'Sandesh'
    },
  ];
  leadOwnerList:any = [
    {
      id:1,
      name:'Rohith'
    },
    {
      id:2,
      name:'Sandesh'
    },
  ];
  departmentList:any = [];
  courseList:any = [];
  countryList:any = [];
  stateList:any = [];
  
  selectedFiles: any;
  file!:File;
  formData:any;
  inputEl: any;
  

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
   ){
    this.dropDownValues()
   }

    ngOnInit(): void {
      this.initForm();

    }
    dropDownValues(){
      this.getCountry();
      this.getState();
      this.getChannel();
      this.getSource();
      this.getDepartment();
      this.getCourse();
      this.getPriority();
      this.getStatus();
    }
    
    getCountry(){
      this.api.getAllCountry().subscribe((res:any)=>{
        if(res){
        this.countryList = res.results
        //console.log(res)
        }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
    }
    getState(){
      this.api.getAllState().subscribe((res:any)=>{
        if(res){
          this.stateList = res.results
          //console.log(res)
        }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
    }
    getChannel(){
      this.api.getAllChannel().subscribe((resp:any)=>{
        if(resp.results){
          this.channelList= resp.results;
          //console.log(this.channelList,"this.newChannelOptions")
        }
        else{
          this.api.showError('ERROR')
        }  
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      }
  
      )
    }
    getSource(){
      this.api.getAllSource().subscribe((res:any)=>{
       if(res.results){
        this.sourceList = res.results
       }
       else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
    }
    
   
    
    getDepartment(){
      this.api.getAllDepartment().subscribe((res:any)=>{
        if(res.results){
          this.departmentList = res.results;
        }
        else{
          this.api.showError('ERROR')
         }
        },(error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
          
        })
    }
    getCourse(){
      this.api.getAllCourse().subscribe((res:any)=>{
        if(res.results){
          this.courseList = res.results;
        }
        else{
          this.api.showError('ERROR')
         }
        },(error:any)=>{
           this.api.showError(this.api.toTitleCase(error.error.message))
          
        })
      
    } 
    getPriority(){
      this._baseService.getData(environment.lead_priority).subscribe((res:any)=>{
          if(res.results){
            this.priorityList = res.results
          } else{
            this.api.showError('ERROR')
           }
          },(error:any)=>{
             this.api.showError(this.api.toTitleCase(error.error.message))
        })
    }
    getStatus(){
     this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
      if(res.results){
        this.statusList = res.results;
      }
     },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
     })
    }
   
   
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length) {
        this.file = event.target.files[0];
       ////console.log(this.file)
      // You can also update your form control if needed
      this.uploadLeadForm.get('leadUpload')?.setValue(this.file);
      }
    }
    
    initForm(){
      this.uploadLeadForm = this.fb.group({
       //step-1
       channel_id:[''],
       source:[''],
       priority:[''],
       status:[''],
      //  subStatus:[''],
       leadOwner:['',Validators.required],
      //  reason:[''],
       referedTo:['',Validators.required],
       //step-2
       department:[''],
       course:[''],
       country:[''],
       state:[''],
       welcomeEmail:[''],
       welcomeSms:[''],
       //step-3
       leadUpload:['',Validators.required]
      });
    }
    selectFile(event:any) {
      this.selectedFiles = event.target.files;
    }
    get f() {
      return this.uploadLeadForm.controls;
    }
    clearSelectField(fieldName: string) {
        this.uploadLeadForm.get(fieldName)?.reset();
      }
    closePopup(){
      this._bottomSheetRef.dismiss()
    }
    onSubmit(){  
       let f = this.uploadLeadForm.value
       this.formData = new FormData();
     
        
           if(this.uploadLeadForm.invalid){
          this.uploadLeadForm.markAllAsTouched();
          this.api.showError('Invalid Form')
        }else{
          if (this.file) {
            this.formData.set('sample_file',this.file);
            // this.formData.set('name',this.file.name);
             // Append other fields to the formData
              this.formData.set('channel_id', f.channel);
              this.formData.set('source_id', f.source);
              this.formData.set('priority_id', f.priority);
              this.formData.set('status_id', f.status);
              this.formData.set('lead_owner', f.leadOwner);
              this.formData.set('refered_to_ids', [Number(f.referedTo)]);
              this.formData.set('departent_id', f.department);
              this.formData.set('course_id', f.course);
              this.formData.set('country_id', f.country);
              this.formData.set('state_id', f.state);
              // this.formData.set('send_welcome_email', f.welcomeEmail);
              // this.formData.set('send_welcome_sms', f.welcomeSms);
              this.formData.set('send_welcome_email', false);
              this.formData.set('send_welcome_sms', false);
              this._baseService.postFile(`${environment.lead_upload}`,this.formData).subscribe((res:any)=>{
                if(res){
                  this.api.showSuccess(res.message)
                }
              },((error:any)=>{
                this.api.showError(error.error.error.message)
              }))
            } 
         
        }
      
    }
    
}
