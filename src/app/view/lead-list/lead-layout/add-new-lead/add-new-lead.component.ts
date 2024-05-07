import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { AddCourseComponent } from 'src/app/view/advance-settings/setup-dropdown-values/course/add-course/add-course.component';
import { AddStreamComponent } from 'src/app/view/advance-settings/setup-dropdown-values/stream/add-stream/add-stream.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new-lead',
  templateUrl: './add-new-lead.component.html',
  styleUrls: ['./add-new-lead.component.css']
})
export class AddNewLeadComponent implements OnInit {
  
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
  //leadStage:any = ['Data (Intital stage)','Qualified Lead','Walkin','Application','Payment','Document Verification', 'Admission','Droupout']
  addLeadForm!:FormGroup;
  max!: Date;
  user_id: any;
  streamList: any = [];
  min!:Date;
  levelofProgram: any = [];
  user_role:any;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _commonService:CommonServiceService,
    private fb:FormBuilder,
    private api:ApiService,
    private _baseService:BaseServiceService,
    private _datePipe:DatePipe,
    private _addLeadEmitter:AddLeadEmitterService,
    private dialog: MatDialog
    ) { 
      this.user_id = localStorage.getItem('user_id')
      this.user_role = localStorage.getItem('user_role')?.toUpperCase()
      this.dropDownValues()
      this.min = new Date('1900-01-01')
    }

  ngOnInit(): void {
    this.initForm()
    this.max = new Date()
  }
  initForm(){
      this.addLeadForm = this.fb.group({
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
    return this.addLeadForm.controls;
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
    let query = this.user_role === "COUNSELLOR" || this.user_role === "COUNSELOR"  || this.user_role === "ADMIN"  ?`?user_id=${this.user_id}` : ""
    this._baseService.getData(`${environment._user}${query}`).subscribe((res:any)=>{
      if(res.results){
      this.referredTo = res.results
      }
    },((error:any)=>{
       this.api.showError(this.api.toTitleCase(error.error.message))
    }))
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
  getCounselledBy() {
    this._baseService.getData(`${environment._user}?role_name=Admin`).subscribe(
      (res: any) => {
        if (res.results) {
          this.adminList = res.results
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getLevelOfProgram(){
    this.api.getAllLevelOfProgram().subscribe((resp:any)=>{
      if(resp.results){
        this.levelofProgram = resp.results
      }
    })
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
  clearSelectField(fieldName: string) {
    this.addLeadForm.get(fieldName)?.reset();
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
  onSubmit(){
    let f = this.addLeadForm.value

  let data:any ={
    first_name: f['firstName'],
    last_name: "",
    email: f['email'] || 'fcmtest@gmail.com',
    mobile_number:f['mobile'],
    date_of_birth:this._datePipe.transform(f['dateOfBirth'],'YYYY-MM-dd') || null,
    alternate_mobile_number:f['alternateNumber'] || null,
    role: 5,
    created_by: this.user_id,
    refered_to: f['counsellor'],
    location:  null,
    pincode: f['pincode'] || null,
    country:f['countryId'],
    state: f['state'],
    city: f['cityName'],
    zone:f['zone'],
    reference_name:f['referenceName'],
    reference_mobile_number:f['referencePhoneNumber'] || null,
    father_name:f['fatherName'],
    father_occupation:f['fatherOccupation'],
    father_mobile_number:f['fatherPhoneNumber'] || null,
    tenth_per: f['tenthPercentage'] || null,
    twelfth_per: f['twelthPercentage'] || null,
    degree_per: f['degree'] || null,
    stream: f["course"],
    others: f["otherCourse"],
    enterance_exam: f["entranceExam"],
    course_looking_for: f["courseLookingfor"] || [],
    lead_list_status:f['leadStatus'],
    lead_list_substatus: null,
    counselled_by:f['counsellorAdmin'],
    lead_stage: f['leadStages'],
    source: f['leadSource'],
    level_of_program:f['levelOfProgram'],
    preferance_college_and_location: 
            {
              preferred_college1: f["preferredCollege1"],
              preferred_college2: f["preferredCollege2"],
              preferred_location1: f["preferredLocation1"],
              preferred_location2: f["preferredLocation2"]
            },
    note_name:f['notes'],
    created_note_remark_by:this.user_id,
    remark_name:f['remarks']
  }

  if (this.addLeadForm.invalid) {
    let mandatoryFieldsEmpty = false;
    let nonMandatoryFieldsInvalid = false;
  
    // Check if any mandatory fields are empty
    const mandatoryFields = ['firstName', 'mobile', 'email', 'counsellor', 'leadSource', 'leadStages','alternateNumber'];
    mandatoryFields.forEach(field => {
      if (!this.addLeadForm.get(field)?.value) {
        mandatoryFieldsEmpty = true;
      }
    });
  
    // Check if any non-mandatory fields are invalid
    Object.keys(this.addLeadForm.controls).forEach(key => {
      const control = this.addLeadForm.get(key);
      if (control?.invalid && !mandatoryFields.includes(key)) {
        nonMandatoryFieldsInvalid = true;
      }
    });
  
    if (mandatoryFieldsEmpty && nonMandatoryFieldsInvalid) {
      this.api.showError("Please fill the mandatory fields and correct the invalid inputs.");
      this.addLeadForm.markAllAsTouched()
    } else if (mandatoryFieldsEmpty) {
      this.api.showError("Please fill the mandatory fields.");
      this.addLeadForm.markAllAsTouched()
    } else if (nonMandatoryFieldsInvalid) {
      this.api.showError("Correct the invalid inputs.");
      this.addLeadForm.markAllAsTouched()
    }
  }
    else{
      this._baseService.postData(environment.lead_list,data).subscribe((res:any)=>{
        if(res){
          this.addLead.emit('ADD')
          this.api.showSuccess(res.message)
          this._bottomSheetRef.dismiss('yes');
          this._addLeadEmitter.triggerGet();
        }
      },(error=>{
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
