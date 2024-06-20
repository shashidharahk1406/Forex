import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { DataService } from 'src/app/service/data.service';
import { AddCountryComponent } from 'src/app/view/advance-settings/setup-dropdown-values/country-id/add-country/add-country.component';
import { AddCourseComponent } from 'src/app/view/advance-settings/setup-dropdown-values/course/add-course/add-course.component';
import { AddStreamComponent } from 'src/app/view/advance-settings/setup-dropdown-values/stream/add-stream/add-stream.component';
import { AddCityComponent } from 'src/app/view/lead-list/lead-layout/add-city/add-city.component';
import { AddStateComponent } from 'src/app/view/lead-list/lead-layout/add-state/add-state.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  step: number = 0;
  countryOptions: any = [];
  stateOptions: any = [];
  channels: any = [];
  cityOptions: any = [];
  campaignOptions: any = [];
  leadStatus: any = [];

  referredTo: any = [];

  adminList: any = [];
  leadSources: any = [];
  @Output() addLead = new EventEmitter();
  courseOptions: any = [];
  showOtherInput: boolean = false;
  zone: string[] = ['South', 'North', 'East', 'West'];
  leadStage: any = [];
  editLeadForm!: FormGroup;
  leadData: any = [];
  user_id: any;
  streamList: any = [];
  max!: Date;
  min!: Date;
  levelofProgram: any = [];
  user_role: any;
  filteredCountryOptions: any = [];
  filteredCityOptions: any = [];
  filteredStateOptions: any = [];
  lead: any = [];
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    private _commonService: CommonServiceService,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private api: ApiService,
    private _baseService: BaseServiceService,
    private _datePipe: DatePipe,
    private _addLeadEmitter: AddLeadEmitterService,
    private dialog: MatDialog,
    private dataService:DataService
  ) {
    this.user_id = localStorage.getItem('user_id');
    this.user_role = localStorage.getItem('user_role')?.toUpperCase();
    this.initForm();
    this.dropDownValues();
    this.getLeadById();

    this.min = new Date('1900-01-01');
  }

  ngOnInit(): void {
    this.max = new Date();
    this.editLeadForm.get('countryId')?.valueChanges.subscribe((value:any) => {
      if (value) {
        this.editLeadForm.get('state')?.enable();  
      }
    });
    this.editLeadForm.get('state')?.valueChanges.subscribe((value:any) => {
      if (value) {
        this.editLeadForm.get('cityName')?.enable();  
      } 
    });
  }
  getLeadById() {
    this._baseService
      .getByID(`${environment.lead_list}${this.data.user_data.id}/`)
      .subscribe(
        (res: any) => {
          if (res && res.result && res.result.length > 0) {
            this.lead = res.result[0];
            let courseId = [];

            if (this.lead.course_looking_for?.length > 0) {
              courseId = this.lead.course_looking_for.map((m: any) => m.id);
            }
            this.getState(this.lead)
            if(this.leadData.state){
              this.getCity(this.lead);
            }
            this.editLeadForm.patchValue({
              firstName: this.lead.user_data.first_name,
              mobile: this.lead.user_data.mobile_number,
              alternateNumber: this.lead.alternate_mobile_number,
              email: this.lead.user_data.email,
              dateOfBirth: this.lead.date_of_birth,
              state: this.lead.state,
              zone: this.lead.zone,
              course: this.lead.stream,
              //cityName: this.lead.city,
              pincode: this.lead.pincode,
              countryId: this.lead.country,
              referenceName: this.lead.reference_name,
              referencePhoneNumber: this.lead.reference_mobile_number,
              fatherName: this.lead.father_name,
              fatherOccupation: this.lead.father_occupation,
              fatherPhoneNumber: this.lead.father_mobile_number,
              tenthPercentage: this.lead.tenth_per,
              twelthPercentage: this.lead.twelfth_per,
              degree: this.lead.degree_per,
              otherCourse: this.lead.others,
              entranceExam: this.lead.enterance_exam,
              courseLookingfor: courseId,
              levelOfProgram: this.lead.level_of_program,
              preferredCollege1: this.lead.preferred_college1,
              preferredCollege2: this.lead.preferred_college2,
              preferredLocation1: this.lead.preferred_location1,
              preferredLocation2: this.lead.preferred_location2,
              counsellor: this.lead.referred_to,
              counsellorAdmin: this.lead.counselled_by,
              leadSource: this.lead.source,
              leadStages: this.lead.lead_stage,
              leadStatus: this.lead.lead_list_status,
              notes: this.lead.note_name,
              remarks: this.lead.remark_name,
            });
          }
        },
        (error) => {
          this.api.showError(error.error.message);
        }
      );
  }

  initForm() {
    this.editLeadForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(this._commonService.namePattern),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(this._commonService.mobilePattern),
        ],
      ],
      alternateNumber: [
        '',
        [Validators.pattern(this._commonService.mobilePattern)],
      ],
      email: ['', [Validators.pattern(this._commonService.emailPattern)]],
      dateOfBirth: [''],
      zone: [''],
      state: [{ value: '', disabled: true }],
      cityName: [{ value: '', disabled: true }],
      pincode: ['', Validators.pattern(this._commonService.pincode)],
      countryId: [''],
      referenceName: ['', Validators.pattern(this._commonService.namePattern)],
      referencePhoneNumber: [
        '',
        Validators.pattern(this._commonService.mobilePattern),
      ],
      fatherName: ['', Validators.pattern(this._commonService.namePattern)],
      fatherOccupation: [
        '',
        Validators.pattern(this._commonService.namePattern),
      ],
      fatherPhoneNumber: [
        '',
        Validators.pattern(this._commonService.mobilePattern),
      ],
      tenthPercentage: [
        '',
        Validators.pattern(this._commonService.nonNegativeValidator),
      ],
      twelthPercentage: [
        '',
        Validators.pattern(this._commonService.nonNegativeValidator),
      ],
      degree: [
        '',
        Validators.pattern(this._commonService.nonNegativeValidator),
      ],
      course: [''],
      otherCourse: [''],
      levelOfProgram: [''],
      entranceExam: ['', Validators.pattern(this._commonService.namePattern)],
      courseLookingfor: [''],
      preferredCollege1: [
        '',
        Validators.pattern(this._commonService.namePattern),
      ],
      preferredCollege2: [
        '',
        Validators.pattern(this._commonService.namePattern),
      ],
      preferredLocation1: [
        '',
        Validators.pattern(this._commonService.namePattern),
      ],
      preferredLocation2: [
        '',
        Validators.pattern(this._commonService.namePattern),
      ],
      counsellor: ['', [Validators.required]],
      counsellorAdmin: [''],
      leadSource: [''],
      leadStages: [''],
      leadStatus: ['', Validators.required],
      notes: [
        '',
        [
          Validators.required,
          Validators.pattern(this._commonService.namePattern),
        ],
      ],
      // remarks:['',Validators.pattern(this._commonService.namePattern)]
    });
  }

  setStep(index: number) {
    this.step = index;
  }
  closePopup() {
    this._bottomSheetRef.dismiss();
  }
  get f() {
    return this.editLeadForm.controls;
  }

  onCourseSelectionChange(event: any) {
    if (event.target.value) {
      this.showOtherInput = !this.showOtherInput;
    }
  }
  dropDownValues() {
    this.getCountry();
    // this.getState();
    // this.getCity();
    this.getChannel();
    this.getSource();
    this.getCounselor();
    this.getStatus();
    this.getCourse();
    this.getCounselledBy();
    this.getLeadStage();
    this.getStream();
    this.getLevelOfProgram();
  }
  getCountry() {
    this.api.getAllCountry().subscribe(
      (res: any) => {
        if (res.results) {
          this.countryOptions = res.results.map((item: any) => ({
            ...item,
            name: this.toTitleCase(item.name)
          })).sort((a: any, b: any) => a.name.localeCompare(b.name));
          this.filteredCountryOptions = this.countryOptions;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  resetVal(){
    this.filteredStateOptions = []
    this.filteredCityOptions = []
    this.editLeadForm.patchValue({
      state:'',
      cityName:''
    })
  }
  getState(lead?:any) {
    let selectedCountryName: any;
    this.resetVal()
    if (this.countryOptions.length > 0) {
      if (this.editLeadForm?.value.countryId || lead?.country) {
        this.countryOptions.forEach((f: any) => {
          if (
            f.id == this.editLeadForm?.value.countryId ||
            f.id == lead?.country
          ) {
            selectedCountryName = f.name;
          }
        });
      }
    }

    let country = selectedCountryName;
    let params = `?country_name=${country}`;

    this.api.getAllState(params).subscribe(
      (res: any) => {
        if (res.results) {
          this.stateOptions = res.results.map((item: any) => ({
            ...item,
            name: this.toTitleCase(item.name)
          })).sort((a: any, b: any) => a.name.localeCompare(b.name));
          this.filteredStateOptions = this.stateOptions;
          //console.log(res)
          this.getCity(lead)
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
    
  }
  resetVal2(){
    this.filteredCityOptions = []
    this.editLeadForm.patchValue({
      cityName:''
    })
  }
  getCity(lead?:any) {
    this.resetVal2()
    let selectedStateName: any;
    if (this.stateOptions.length > 0) {

      if (this.editLeadForm?.value.state || lead?.state) {
        
        this.stateOptions.forEach((f: any) => {
          if (
            f.id == this.editLeadForm?.value.state ||
            f.id == lead?.state
          ) {
            selectedStateName = f.name;
          }
        });
      }
    }

    let state = selectedStateName;
    let params = `?state_name=${state}`;

    this.api.getAllCity(params).subscribe(
      (res: any) => {
        if (res.results) {
          this.cityOptions = res.results.map((item: any) => ({
            ...item,
            name: this.toTitleCase(item.name)
          })).sort((a: any, b: any) => a.name.localeCompare(b.name));
          this.filteredCityOptions = this.cityOptions;
          this.editLeadForm.patchValue({
            cityName: lead?.city
          })
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  getChannel() {
    this.api.getAllChannel().subscribe(
      (resp: any) => {
        if (resp.results) {
          this.channels = resp.results;
          //console.log(this.channels,"this.newChannelOptions")
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getSource() {
    this.api.getAllSource().subscribe(
      (res: any) => {
        if (res.results) {
          this.leadSources = res.results;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  getCampign() {
    this.api.getAllCampign().subscribe(
      (res: any) => {
        if (res.results) {
          this.campaignOptions = res.results;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getCounselor() {
    let query = '';
    const counsellorRoles = ['COUNSELLOR', 'COUNSELOR'];
    const superAdminRoles = ['SUPERADMIN', 'SUPER ADMIN'];
    const adminRoles = ['ADMIN'];

    if (counsellorRoles.includes(this.user_role)) {
      query = `?user_id=${this.user_id}`;
    } else if (superAdminRoles.includes(this.user_role)) {
      query = ``;
    } else if (adminRoles.includes(this.user_role)) {
      query = `?user_id=${this.user_id}`;
    }
    this._baseService.getData(`${environment._user}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.referredTo = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getLevelOfProgram() {
    this.api.getAllLevelOfProgram().subscribe((resp: any) => {
      if (resp.results) {
        this.levelofProgram = resp.results;
      }
    });
  }
  getStatus() {
    this._baseService.getData(`${environment.lead_status}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.leadStatus = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getCourse() {
    this.api.getAllCourse().subscribe(
      (res: any) => {
        if (res) {
          this.courseOptions = res;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getCounselledBy() {
    let query = `?role_name=superadmin`;

    this._baseService.getData(`${environment._user}${query}`).subscribe(
      (res: any) => {
        if (res.results) {
          this.adminList = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  getLeadStage() {
    this._baseService.getData(environment.leadStage).subscribe(
      (res: any) => {
        if (res) {
          this.leadStage = res;
        }
      },
      (error: any) => {
        this.api.showError(error.error.message);
      }
    );
  }
  getStream() {
    this._baseService.getData(`${environment.studying_stream}`).subscribe(
      (resp: any) => {
        if (resp) {
          this.streamList = resp;
        }
      },
      (error: any) => {
        //console.log(error);
      }
    );
  }
  clearSelectField(fieldName: string) {
    this.editLeadForm.get(fieldName)?.reset();
  }

  filterCountries(event: any, type: any, countryOptions: any) {
    let searchTerm: any = '';
    if (event) {
      searchTerm = event.target.value.toLowerCase();

      if (searchTerm === '' && type === 'country') {
        this.filteredCountryOptions = countryOptions;
        return this.filteredCountryOptions;
      }
      if (searchTerm === '' && type === 'state') {
        this.filteredStateOptions = countryOptions;
        return this.filteredStateOptions;
      }
      if (searchTerm === '' && type === 'city') {
        this.filteredCityOptions = countryOptions;
        return this.filteredCityOptions;
      }

      let filteredCountries = countryOptions.filter((option: any) => {
        const name: any = option.name.toLowerCase();
        return name.includes(searchTerm);
      });

      if (!filteredCountries.length) {
        filteredCountries = [{ name: `No ${type} found` }];
      }
      if (type === 'country') {
        this.filteredCountryOptions = filteredCountries;
      }
      if (type === 'state') {
        this.filteredStateOptions = filteredCountries;
      }
      if (type === 'city') {
        this.filteredCityOptions = filteredCountries;
      }
    }
  }
  onSubmit() {
    const formData = this.editLeadForm.value;
    const data = {
      first_name: formData.firstName,
      last_name: '',
      email: formData.email || '',
      mobile_number: formData.mobile || null,
      date_of_birth:
        this._datePipe.transform(formData.dateOfBirth, 'YYYY-MM-dd') || null,
      alternate_mobile_number: formData.alternateNumber || null,
      role: 5,
      location: formData.cityName,
      pincode: formData.pincode || null,
      country: formData.countryId,
      state: formData.state,
      city: formData.cityName,
      zone: formData.zone,
      lead_list_status: formData.leadStatus,
      lead_list_substatus: 1,
      counselled_by: formData.counsellorAdmin,
      lead_stage: formData.leadStages,
      updated_by: this.user_id,
      note: formData.notes,
      remark: formData.remarks || null,
      source: formData.leadSource,
      refered_to: formData.counsellor,
      level_of_program: formData.levelOfProgram,
      education_details: {
        tenth_per: formData.tenthPercentage || null,
        twelfth_per: formData.twelthPercentage || null,
        degree_per: formData.degree || null,
        stream: formData.course,
        others: formData.otherCourse,
        enterance_exam: formData.entranceExam,
        course_looking_for: formData.courseLookingfor || [],
        preferance_college_and_location: {
          preferred_college1: formData.preferredCollege1,
          preferred_college2: formData.preferredCollege2,
          preferred_location1: formData.preferredLocation1,
          preferred_location2: formData.preferredLocation2,
        },
      },
      additional_info: {
        reference_name: formData.referenceName,
        reference_mobile_number: formData.referencePhoneNumber || null,
        father_name: formData.fatherName,
        father_occupation: formData.fatherOccupation,
        father_mobile_number: formData.fatherPhoneNumber || null,
      },
    };

    if (this.editLeadForm.invalid) {
      let mandatoryFieldsEmpty = false;
      let nonMandatoryFieldsInvalid = false;

      // Check if any mandatory fields are empty
      const mandatoryFields = [
        'firstName',
        'mobile',
        'counsellor',
        'leadStatus',
        'notes',
      ];
      mandatoryFields.forEach((field) => {
        if (!this.editLeadForm.get(field)?.value) {
          mandatoryFieldsEmpty = true;
        }
      });

      // Check if any non-mandatory fields are invalid
      Object.keys(this.editLeadForm.controls).forEach((key) => {
        const control = this.editLeadForm.get(key);
        if (control?.invalid && !mandatoryFields.includes(key)) {
          nonMandatoryFieldsInvalid = true;
        }
      });

      if (mandatoryFieldsEmpty && nonMandatoryFieldsInvalid) {
        this.api.showError(
          'Please fill the mandatory fields and correct the invalid inputs.'
        );
        this.editLeadForm.markAllAsTouched();
      } else if (mandatoryFieldsEmpty) {
        this.api.showError('Please fill the mandatory fields.');
        this.editLeadForm.markAllAsTouched();
      } else if (nonMandatoryFieldsInvalid) {
        this.api.showError('Correct the invalid inputs.');
        this.editLeadForm.markAllAsTouched();
      }
    } else {
      this._baseService
        .updateData(`${environment.lead_list}${this.data.user_data.id}/`, data)
        .subscribe(
          (res: any) => {
           if (res) {
              this.addLead.emit('ADD')
              this.api.showSuccess('Customer details updated successfully');
              this._bottomSheetRef.dismiss('yes');
              this._addLeadEmitter.triggerGet();
              this.dataService.dataSubject.next(true)
              
            }
          },
          (error) => {
            this.api.showError(error?.error.message);
          }
        );
    }
  }
  openAddCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
      this.getCourse();
    });
  }
  openAddStream() {
    const dialogRef = this.dialog.open(AddStreamComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
      this.getStream();
    });
  }
  openAddCountry() {
    const dialogRef = this.dialog.open(AddCountryComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
      this.getCountry();
    });
  }
  openAddCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {
      width: '35%',
      data:this.editLeadForm.value.state
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
      this.getCity();
    });
  }
  openAddState() {
    const dialogRef = this.dialog.open(AddStateComponent, {
      width: '35%',
      data:this.editLeadForm.value.country
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
      this.getState();
    });
  }
}
