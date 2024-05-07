import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { AddCourseComponent } from 'src/app/view/advance-settings/setup-dropdown-values/course/add-course/add-course.component';
import { AddStreamComponent } from 'src/app/view/advance-settings/setup-dropdown-values/stream/add-stream/add-stream.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  step: number = 0;
  countryOptions: any = [];
  stateOptions: any = [];
  channels: any = [];
  cityOptions: any = [];
  campaignOptions: any = [];
  leadStatus:any = [];
  
  referredTo: any = [];
  
  adminList:any = [];
  leadSources: any = [];
  @Output() addLead = new EventEmitter()
  courseOptions: any = [];
  showOtherInput: boolean = false;
  zone:string[] = ['South','North', 'East', 'West'];
  leadStage:any = [];
  editLeadForm!:FormGroup;
  leadData: any = [];
  user_id: any;
  streamList: any = [];
  max!: Date;
  min!: Date;
  levelofProgram: any = [];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _commonService:CommonServiceService,
    private fb:FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _datePipe:DatePipe,
    private _addLeadEmitter:AddLeadEmitterService,
    private dialog:MatDialog
    ) { 
      this.dropDownValues()
      this.user_id = localStorage.getItem('user_id')
      this.min = new Date('1900-01-01')
    }

  ngOnInit(): void {
    this.initForm()
    this.max = new Date()
    this.getLeadById()
  }
  getLeadById() {
    this._baseService.getByID(`${environment.lead_list}${this.data.user_data.id}/`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.length > 0) {
          const lead = res.result[0];
          let courseId = [];
          
          if(lead.course_looking_for?.length >0){
             courseId = lead.course_looking_for.map((m:any)=>m.id)
          }
         
          this.editLeadForm.patchValue({
            firstName: lead.user_data.first_name,
            mobile: lead.user_data.mobile_number,
            alternateNumber: lead.alternate_mobile_number,
            email: lead.user_data.email,
            dateOfBirth: lead.date_of_birth,
            state: lead.state,
            zone: lead.zone,
            course:lead.stream,
            cityName: lead.city,
            pincode: lead.pincode,
            countryId: lead.country,
            referenceName: lead.reference_name,
            referencePhoneNumber: lead.reference_mobile_number,
            fatherName: lead.father_name,
            fatherOccupation: lead.father_occupation,
            fatherPhoneNumber: lead.father_mobile_number,
            tenthPercentage: lead.tenth_per,
            twelthPercentage: lead.twelfth_per,
            degree: lead.degree_per,
            otherCourse: lead.others,
            entranceExam: lead.enterance_exam,
            courseLookingfor: courseId,
            levelOfProgram:lead.level_of_program,
            preferredCollege1: lead.preferred_college1,
            preferredCollege2: lead.preferred_college2,
            preferredLocation1: lead.preferred_location1,
            preferredLocation2: lead.preferred_location2,
            counsellor: lead.referred_to,
            counsellorAdmin: lead.counselled_by,
            leadSource: lead.source,
            leadStages: lead.lead_stage,
            leadStatus: lead.lead_list_status,
            notes: lead.note_name,
            remarks: lead.remark_name
          });
        }
      },
      (error:any) => {
        this.api.showError(error.error.message);
      }
    );
  }
  
  initForm(){
      this.editLeadForm = this.fb.group({
        firstName: ['', [Validators.required,Validators.pattern(this._commonService.namePattern)]],
        mobile: ['', [Validators.required, Validators.pattern(this._commonService.mobilePattern)]],
        alternateNumber: ['', [Validators.pattern(this._commonService.mobilePattern)]], 
        email: ['', [Validators.required,Validators.email,Validators.pattern(this._commonService.emailPattern)]],
        dateOfBirth:[''],
        state: [''],
        zone:[''],
        cityName: [''],
        pincode:['',Validators.pattern(this._commonService.pincode)],
        countryId:[''],
        referenceName:['',Validators.pattern(this._commonService.namePattern)],
        referencePhoneNumber:['',Validators.pattern(this._commonService.mobilePattern)],
        fatherName:['',Validators.pattern(this._commonService.namePattern)],
        fatherOccupation:['',Validators.pattern(this._commonService.namePattern)],
        fatherPhoneNumber:['',Validators.pattern(this._commonService.mobilePattern)],
        tenthPercentage :['',Validators.pattern(this._commonService.nonNegativeValidator)],
        twelthPercentage :['',Validators.pattern(this._commonService.nonNegativeValidator)],
        degree:['',Validators.pattern(this._commonService.nonNegativeValidator)],
        course:[''],
        otherCourse:[''],
        levelOfProgram:[''],
        entranceExam:['',Validators.pattern(this._commonService.namePattern)],
        courseLookingfor:[''],
        preferredCollege1:['',Validators.pattern(this._commonService.namePattern)],
        preferredCollege2:['',Validators.pattern(this._commonService.namePattern)],
        preferredLocation1:['',Validators.pattern(this._commonService.namePattern)],
        preferredLocation2:['',Validators.pattern(this._commonService.namePattern)],
        counsellor:['',[Validators.required]],
        counsellorAdmin:[''],
        leadSource:['',[Validators.required]],
        leadStages:['',[Validators.required]],
        leadStatus:[''],
        notes:['',Validators.pattern(this._commonService.namePattern)],
        remarks:['',Validators.pattern(this._commonService.namePattern)]
      })
  }
  
  setStep(index: number) {
    this.step = index;
  }
  closePopup(){
    this._bottomSheetRef.dismiss()
  }
  get f() {
    return this.editLeadForm.controls;
  }
 
  onCourseSelectionChange(event:any) {
    if(event.target.value){
      this.showOtherInput = !this.showOtherInput
    }
  }
  dropDownValues(){
    this.getCountry();
    this.getState();
    this.getChannel();
    this.getSource();
    this.getCity();
    this.getCounselor();
    this.getStatus();
    this.getCourse();
    this.getCounselledBy();
    this.getLeadStage();
    this.getStream();
    this.getLevelOfProgram()
  }
  getCountry(){
    this.api.getAllCountry().subscribe((res:any)=>{
      if(res.results){
      this.countryOptions = res.results
      //console.log(res)
      }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getState(){
    this.api.getAllState().subscribe((res:any)=>{
      if(res.results){
        this.stateOptions = res.results
        //console.log(res)
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
      this.leadSources = res.results
     }
     else{
      this.api.showError('ERROR')
     }
    },(error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
      
    })
  }
  getCity(){
    this.api.getAllCity().subscribe((res:any)=>{
      if(res.results){
        this.cityOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
  }
  getCampign(){
    this.api.getAllCampign().subscribe((res:any)=>{
      if(res.results){
        this.campaignOptions = res.results;
      }
      else{
        this.api.showError('ERROR')
       }
      },(error:any)=>{
         this.api.showError(this.api.toTitleCase(error.error.message))
        
      })
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
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((resp:any)=>{
      if(resp.results){
        this.levelofProgram = resp.results
      }
    })
  }
  getStatus(){
    this._baseService.getData(`${environment.lead_status}`).subscribe((res:any)=>{
     if(res.results){
       this.leadStatus = res.results;
     }
    },(error:any)=>{
      this.api.showError(this.api.toTitleCase(error.error.message))
    })
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
  getCounselledBy(){
    this._baseService.getData(`${environment._user}?role_name=Admin`).subscribe((res:any)=>{
      if(res.results){
      this.adminList = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
  }
  getLeadStage(){
    this._baseService.getData(environment.leadStage).subscribe((res:any)=>{
     if(res){
      this.leadStage = res
     }
    },((error:any)=>{
     this.api.showError(error.error.message)
    }))
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
  clearSelectField(fieldName: string) {
    this.editLeadForm.get(fieldName)?.reset();
   }
   
  
onSubmit(){
 
const formData = this.editLeadForm.value;
const data ={
  first_name: formData.firstName,
  last_name:"",
  email: formData.email || '',
  mobile_number: formData.mobile || null,
  date_of_birth: this._datePipe.transform(formData.dateOfBirth,'YYYY-MM-dd') || null,
  alternate_mobile_number: formData.alternateNumber || null,
  role: 5,
  location:  formData.cityName,
  pincode: formData.pincode || null,
  country: formData.countryId,
  state: formData.state, 
  city: formData.cityName, 
  zone: formData.zone,
  lead_list_status: formData.leadStatus,
  lead_list_substatus: 1,
  counselled_by: formData.counsellorAdmin,
  lead_stage: formData.leadStages,
  updated_by:this.user_id,
  note: formData.notes,
  remark: formData.remarks,
  source: formData.leadSource,
  refered_to: formData.counsellor,
  level_of_program:formData.levelOfProgram,
  education_details: {
  tenth_per: formData.tenthPercentage || null,
  twelfth_per: formData.twelthPercentage || null,
  degree_per: formData.degree || null,
  stream: formData.course,
  others: formData.otherCourse,
  enterance_exam: formData.entranceExam,
  course_looking_for: formData.courseLookingfor || [],
    preferance_college_and_location: 
      {
        preferred_college1: formData.preferredCollege1,
        preferred_college2: formData.preferredCollege2,
        preferred_location1: formData.preferredLocation1,
        preferred_location2: formData.preferredLocation2
      }
    
  },
  additional_info: {
    reference_name: formData.referenceName,
    reference_mobile_number:formData.referencePhoneNumber || null,
    father_name: formData.fatherName,
    father_occupation: formData.fatherOccupation,
    father_mobile_number: formData.fatherPhoneNumber || null
  }
}

if (this.editLeadForm.invalid) {
  let mandatoryFieldsEmpty = false;
  let nonMandatoryFieldsInvalid = false;

  // Check if any mandatory fields are empty
  const mandatoryFields = ['firstName', 'mobile', 'email', 'counsellor', 'leadSource', 'leadStages','alternateNumber'];
  mandatoryFields.forEach(field => {
    if (!this.editLeadForm.get(field)?.value) {
      mandatoryFieldsEmpty = true;
    }
  });

  // Check if any non-mandatory fields are invalid
  Object.keys(this.editLeadForm.controls).forEach(key => {
    const control = this.editLeadForm.get(key);
    if (control?.invalid && !mandatoryFields.includes(key)) {
      nonMandatoryFieldsInvalid = true;
    }
  });

  if (mandatoryFieldsEmpty && nonMandatoryFieldsInvalid) {
    this.api.showError("Please fill the mandatory fields and correct the invalid inputs.");
    this.editLeadForm.markAllAsTouched()
  } else if (mandatoryFieldsEmpty) {
    this.api.showError("Please fill the mandatory fields.");
    this.editLeadForm.markAllAsTouched()
  } else if (nonMandatoryFieldsInvalid) {
    this.api.showError("Correct the invalid inputs.");
    this.editLeadForm.markAllAsTouched()
  }
}
  else{
    this._baseService.updateData(`${environment.lead_list}${this.data.user_data.id}/`,data).subscribe((res:any)=>{
      if(res){
        this.addLead.emit('ADD')
        this.api.showSuccess(res.message)
        this._bottomSheetRef.dismiss('yes');
        this._addLeadEmitter.triggerGet();
      }
    },((error:any)=>{
      this.api.showError(error?.error.message)
    }))
  }
}
openAddCourse(){
  const dialogRef = this.dialog.open(AddCourseComponent, {
    width:'35%'
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
    this.getCourse()
  }); 
}
openAddStream(){
  const dialogRef = this.dialog.open(AddStreamComponent, {
    width:'35%'
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
    this.getStream()
  }); 
}

}
