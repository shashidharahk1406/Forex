import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {
  quickAddForm!: FormGroup;

  channels:any = [];
  sources:any = [];
  campaigns:any = [];
  mediums:any = [];
  levels:any = [];
  departments:any = [];
  courses:any = [];
  referredTo: any;
  courseOptions: any = [];
  streamList: any;
  userId: any;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<QuickAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _commonService:CommonServiceService,
    private _addLeadEmitter:AddLeadEmitterService,
    private _datePipe:DatePipe) {
      this.userId = localStorage.getItem('user_id')
    }

  ngOnInit() {
    this.dropDownList()
    this.initForm()
  }
  initForm(){
    this.quickAddForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
      email: ['', [Validators.email,Validators.pattern(this._commonService.emailPattern)]],
      mobile:['',[Validators.required,Validators.pattern(this._commonService.mobilePattern)]],
      source: ['', [Validators.required]],
      courseLookingfor:[''],
      course: ['', [Validators.required]],
      counsellor:['',[Validators.required]]
    });
  }
  dropDownList(){
    this.getChannel()
    this.getSource()
    this.getCourse()
    this.getCounselor()
    this.getStream()
  }
  getCourse(){
    this.api.getAllCourse().subscribe((res:any)=>{
      if(res){
        this.courseOptions = res;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
   
  }
  getChannel(){
    this.api.getAllChannel().subscribe((resp:any)=>{
      if(resp.results){
        this.channels= resp.results;
        //console.log(this.channels,"this.newChannelOptions")
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
      this.sources = res.results
     }
     else{
      this.api.showError('ERROR')
     }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getStream(){
    this._baseService.getData(`${environment.studying_stream}`).subscribe((resp:any)=>{
    if(resp){
     this.streamList = resp
    } 
    },(error:any)=>{
      //console.log(error);
      
    }

    )
  }
 
  getCounselor(){
    this._baseService.getData(`${environment._user}?role_name=counsellor`).subscribe((res:any)=>{
      if(res.results){
      this.referredTo = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }

 
  clearSelectField(fieldName: string) {
    this.quickAddForm.get(fieldName)?.reset();
  }
  onSubmit(){
    let f = this.quickAddForm.value
   
    let data:any ={
      first_name: f['firstName'],
      last_name: "",
      email: f['email'] || null,
      mobile_number:f['mobile'] || null,
      date_of_birth:this._datePipe.transform(f['dateOfBirth'],'YYYY-MM-dd') || null,
      alternate_mobile_number: null,
      role: 5,
      created_by: this.userId,
      refered_to: f['counsellor'],
      location:  null,
      pincode: f['pincode'] || null,
      country:null,
      state: null,
      city: null,
      zone:null,
      reference_name:null,
      reference_mobile_number:null,
      father_name:null,
      father_occupation:null,
      father_mobile_number:null,
      tenth_per: null,
      twelfth_per: null,
      degree_per: null,
      stream: f["course"],
      others: null,
      enterance_exam: null,
      course_looking_for: f["courseLookingfor"],
      lead_list_status:null,
      lead_list_substatus: null,
      counselled_by:null,
      lead_stage: null,
      source: f['source'],
      preferance_college_and_location: 
              {
                preferred_college1:null,
                preferred_college2: null,
                preferred_location1:null,
                preferred_location2: null
              },
      note_name:null,
      created_note_remark_by:'',
      remark_name:null
    }
    if(this.quickAddForm.invalid){
      this.quickAddForm.markAllAsTouched()
      this.api.showError('Please Fill The Mandatory Fields')
    }
    else{
      this._baseService.postData(environment.lead_list,data).subscribe((res:any)=>{
        if(res){
          // this.addLead.emit('ADD')
          this.api.showSuccess(res.message)
          this.dialogRef.close('yes');
          this._addLeadEmitter.triggerGet();
        }
        else{
          this.api.showError("ERROR !")
        }
      },((error:any)=>{
        this.api.showError(error?.error.message)
      }))
    }
  }
}
