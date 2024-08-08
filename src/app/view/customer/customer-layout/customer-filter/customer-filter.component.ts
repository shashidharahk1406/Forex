import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ApiService } from 'src/app/service/API/api.service';
import { AddLeadEmitterService } from 'src/app/service/add-lead-emitter.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css'],
})
export class CustomerFilterComponent implements OnInit {
  filterLead!: FormGroup;
  @Output() filterApplied = new EventEmitter();
  counselorList: any = [];
  channelsList: any = [];
  sourceList: any = [];
  departmentList: any = [];
  courseList: any = [];
  status: any = [];
  cityList: any = [];
  campaignList: any;
  queryItems: any;
  user_id: any;
  @Output() filter: any = new EventEmitter();
  counselled_by: any;
  streamList: any = [];
  role: any;
  counsellor_ids: any;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private _baseService: BaseServiceService,
    private _addLeadEmitter: AddLeadEmitterService,
    private dataService: DataService
  ) {
    this.user_id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('user_role');
    this.counsellor_ids = localStorage.getItem('counsellor_ids');
  }

  ngOnInit(): void {
    this.dropdownvalues();
    this.initForm();
    this._addLeadEmitter.selectedCustomerFilter.subscribe((res: any) => {
      if (res) {
        this.filterLead.patchValue({
          counsellor_id: res.counsellor_id,
          counselled_by: res.counselled_by,
          campaign_id: res.campaign_id,
          channel_id: res.channel_id,
          source_id: res.source_id,
          department_id: res.department_id,
          course_id: res.course_id,
          stream_id: res.stream_id,
          city_id: res.city_id,
          year_of_passing: res.year_of_passing,
        });
      }
    });
  }
  get f() {
    return this.filterLead.controls;
  }
  dropdownvalues() {
    this.getChannel();
    this.getSource();
    this.getCity();
    this.getCounselor();
    this.getChannel();
    this.getCourse();
    this.getCounselledBy();
    this.getStream();
  }
  getChannel() {
    this.api.getAllChannel().subscribe(
      (resp: any) => {
        if (resp.results) {
          this.channelsList = resp.results;
        } else {
          this.api.showError('ERROR');
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
          this.courseList = res;
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
          this.sourceList = res.results;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  cityOptions: any = [];
  getCity() {
    this.api.getAllCity().subscribe(
      (res: any) => {
        if (res.results) {
          this.cityList = res.results;

          this.cityOptions = res.results;
          this.filteredCityOptions = this.cityOptions;
        } else {
          this.api.showError('ERROR');
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  filteredCityOptions: any = [];

  filterCountries(event: any, type: any, countryOptions: any) {
    let searchTerm: any = '';
    if (event) {
      searchTerm = event.target.value.toLowerCase();

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

      if (type === 'city') {
        this.filteredCityOptions = filteredCountries;
      }
    }
  }

  getStream() {
    this._baseService.getData(`${environment.studying_stream}`).subscribe(
      (resp: any) => {
        if (resp) {
          this.streamList = resp;
        }
      },
      (error: any) => {
        this.api.showError(error.error.message);
      }
    );
  }
  getCounselledBy() {
    let query = `?role_name=superadmin`;
    this._baseService.getData(`${environment._user}${query}`).subscribe(
      (res: any) => {
        if (res) {
          this.counselled_by = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  apiUrl: any;

  getCounselor() {
    let query = '';
    if (this.role === 'Admin') {
      query = `&user_id=${this.user_id}`;
    }
    this._baseService.getData(`${environment._user}/?${query}`).subscribe(
      (res: any) => {
        if (res) {
          this.counselorList = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }
  clearSelectField(fieldName: string) {
    this.filterLead.get(fieldName)?.reset();
  }

  onSubmit() {
    if (this.isFormEmpty(this.filterLead.value)) {
      this.filterLead.markAllAsTouched();
      this.api.showError('Please select at least one field');
      this.filterLead.reset();
      this._addLeadEmitter.customerFilter.next('');
      this._addLeadEmitter.selectedCustomerFilter.next('');
      this._addLeadEmitter.customerFilterIcon.next(false);
    } else {
      const formValues = this.filterLead.value;
      console.log(formValues, 'formValues');
      // Create an array of query parameters with non-empty values
      const queryParams = [];
      for (const key in formValues) {
        const value = formValues[key];
        if (value !== '' && value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Handle multi-select fields
            if (value.length > 0) {
              // Convert array of objects to a comma-separated string of IDs
              const ids = value.map((item) => item.id).join(',');
              queryParams.push(`${key}=${ids}`);
            }
          } else {
            queryParams.push(`${key}=${value}`);
          }
        }
      }

      // Construct the API request URL with query parameters

      let isFormValid = Object.keys(this.filterLead.value).some(
        (k: any) => this.filterLead.value[k] != ''
      );

      // console.log(isFormValid,"isFormValid");

      //  console.log(this.role=='Admin' && !this.filterLead.invalid,"this.role==='Admin' && this.filterLead.invalid");
      if (this.role === 'Admin' && !isFormValid) {
        // alert('form is invalid')
        this.apiUrl = `${environment.lead_list}?page=1&page_size=10&user_type=customers&admin_id=${this.user_id}&counsellor_id=${this.counsellor_ids}`;
      } else if (this.role === 'Admin' && isFormValid) {
        // alert('form is valid')
        this.apiUrl = `${environment.lead_list}?page=1&page_size=10&user_type=customers`;
      } else if (this.role === 'counsellor') {
        this.apiUrl = `${environment.lead_list}?page=1&page_size=10&user_type=customers&counsellor_id=${this.user_id}`;
      } else {
        this.apiUrl = `${environment.lead_list}?page=1&page_size=10&user_type=customers`;
      }
      //  console.log(this.apiUrl,"apiurl in customer filetr");
      //  console.log(this.role,"role");

      let filterParams: any;
      if (queryParams.length > 0) {
        console.log(queryParams, 'queryparams');

        // console.log(this.apiUrl,"apiurl in customer filetr");

        this.apiUrl += `&${queryParams.join('&')}`;
        filterParams = `&${queryParams.join('&')}`;
        if (
          filterParams.includes('counselled_by') &&
          this.role === 'counsellor'
        ) {
          this.apiUrl += `&counsellor_id=${this.user_id}`;
        }  if (
           filterParams.includes('counselled_by') &&
          this.role === 'Admin' &&
          this.counsellor_ids
        ) {
          this.apiUrl += `&admin_id=${this.user_id}&counsellor_id=${this.counsellor_ids}`;
        } 
        if(!this.counsellor_ids) {
          this.apiUrl += `&admin_id=${this.user_id}&counsellor_id=0`;
        }
        console.log(filterParams, 'filterParams');

        this._addLeadEmitter.filterWithPageSize.next(filterParams);
      }
      this._addLeadEmitter.customerFilter.next(this.apiUrl);
      this._addLeadEmitter.selectedCustomerFilter.next(this.filterLead.value);
      this._addLeadEmitter.customerfilterTriggerFilter();
      this._addLeadEmitter.customerFilterIcon.next(true);
      this.dataService.filterCustomerRefreshdataSubject.next(true);

      // Make the API request with the constructed URL
      this._bottomSheetRef.dismiss(true);
    }
  }
  reset() {
    this.filterLead.reset();
    this._addLeadEmitter.customerFilter.next('');
    this._addLeadEmitter.selectedCustomerFilter.next('');
    this._addLeadEmitter.customerFilterIcon.next(false);
    this._addLeadEmitter.customerFiltertriggerGet();
  }
  isFormEmpty(formValues: any): boolean {
    for (const key in formValues) {
      if (formValues[key] !== null) {
        return false;
      }
    }
    return true;
  }
  initForm() {
    this.filterLead = this.fb.group({
      counsellor_id: [''],
      counselled_by: [''],
      // campaign_id:[''],
      // channel_id:[''],
      source_id: [''],
      // department_id:[''],
      course_id: [''],
      stream_id: [''],
      city_id: [''],
      // year_of_passing:['']
    });
  }
  closePopup() {
    this._bottomSheetRef.dismiss();
  }
}
