import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { environment } from 'src/environments/environment';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { EmitService } from 'src/app/service/emit/emit.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-profile-filter',
  templateUrl: './user-profile-filter.component.html',
  styleUrls: ['./user-profile-filter.component.css'],
})
export class UserProfileFilterComponent implements OnInit {
  filterForm!: FormGroup;
  allRole: any = [];
  allUser: any = [];
  allDesignation: any = [];
  allDepartment: any = [];
  allLevel: any = [];
  role: any;
  user_id: any;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    private emit: EmitService,
    private dataService: DataService
  ) {
    this.role = localStorage.getItem('user_role');
    this.user_id = localStorage.getItem('user_id');
  }

  ngOnInit(): void {
    this.initFilter();
  }
  createdFromDate(event_from: MatDatepickerInputEvent<Date>, dateType: any) {
    if (dateType == 'creationFrom') {
      this.filterForm.patchValue({
        created_date_time_before: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    } else if (dateType == 'creationTo') {
      this.filterForm.patchValue({
        created_date_time_after: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    } else if (dateType == 'loginFrom') {
      this.filterForm.patchValue({
        last_login_before: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    } else if (dateType == 'loginTo') {
      this.filterForm.patchValue({
        last_login_after: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    } else if (dateType == 'updateFrom') {
      this.filterForm.patchValue({
        updated_date_time_before: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    } else if (dateType == 'updateTo') {
      this.filterForm.patchValue({
        updated_date_time_after: this.datePipe.transform(
          event_from.value,
          'yyyy-MM-dd'
        ),
      });
    }
  }
  initFilter() {
    this.filterForm = this._fb.group({
      role_id: [''],
      is_active: [''],
      designation: [''],
      reporting_to_ids: [''],
      // level_of_program:[''],
      // department:[''],
      // created_date_time_before:[''],
      // created_date_time_after:[''],
      // last_login_before:[''],
      // last_login_after:[''],
      // updated_date_time_before:[''],
      // updated_date_time_after:[''],
    });
    this.getAllRole();
    this.getAllUser();
    this.getDesignation();
    this.getDesignation();
    this.getAllDepartment();
    this.getAllLevel();
    this.setValue();
  }
  get f() {
    return this.filterForm.controls;
  }
  selectedArray: any = [];
  setValue() {
    // var data:any=localStorage.getItem('userFilter')
    // var resp:any= JSON.parse(data)
    var data: any = this.dataService.getUsersfiletredFormValues();
    // console.log(this.dataService.getUsersfiletredFormValues(),"this.dataService.getUsersfiletredFormValues()");
    
    var resp: any = data;
    if (resp) {
      //console.log(resp.reporting_to_ids);
      if (resp.reporting_to_ids) {
        resp.reporting_to_ids.forEach((element: any) => {
          //console.log(element);
          this.selectedArray.push(element);
        });
      }

      //console.log(this.selectedArray);

      this.filterForm.patchValue({ role_id: resp?.role_id });
      this.filterForm.patchValue({ is_active: resp?.is_active });
      this.filterForm.patchValue({ designation: resp?.designation });
      this.filterForm.patchValue({ reporting_to_ids: this.selectedArray });
      // this.filterForm.patchValue({ level_of_program: resp?.level_of_program });
      // this.filterForm.patchValue({ department: resp?.department });
      // this.filterForm.patchValue({ role_id: resp?.role_id });
      // this.filterForm.patchValue({
      //   created_date_time_before: resp?.created_date_time_before,
      // });
      // this.filterForm.patchValue({
      //   created_date_time_after: resp?.created_date_time_after,
      // });
      // this.filterForm.patchValue({
      //   last_login_before: resp?.last_login_before,
      // });
      // this.filterForm.patchValue({ last_login_after: resp?.last_login_after });
      // this.filterForm.patchValue({
      //   updated_date_time_before: resp?.updated_date_time_before,
      // });
      // this.filterForm.patchValue({
      //   updated_date_time_after: resp?.updated_date_time_after,
      // });
    }
  }
  getAllRole() {
    this.api.getAllRole().subscribe(
      (resp: any) => {

        if (this.role === 'SuperAdmin') {
          this.allRole = resp.results;
        }
        if (this.role === 'Admin') {
          this.allRole = resp.results.filter((ele: any) => {
           return ele.name === 'counsellor';
          });
        }
      },
      (error: any) => {}
    );
  }
  filteredAllUser: any = [];
  getAllUser() {
    this.api.getAllUser().subscribe(
      (resp: any) => {
        this.allUser = resp.results;
        this.filteredAllUser = this.allUser.filter((ele: any) => {
          return ele.role_name === 'Admin';
        });
      },
      (error: any) => {}
    );
  }
  getDesignation() {
    this.api.getAllDesignation().subscribe(
      (resp: any) => {
        this.allDesignation = resp.results;
      },
      (error: any) => {}
    );
  }
  getAllDepartment() {
    this.api.getAllDepartment().subscribe(
      (resp: any) => {
        this.allDepartment = resp.results;
      },
      (error: any) => {}
    );
  }
  getAllLevel() {
    this.api.getAllLevelOfProgram().subscribe(
      (resp: any) => {
        this.allLevel = resp.results;
      },
      (error: any) => {}
    );
  }

  filtered: boolean = false;

  status: any = ['True', 'False'];
  baseurl = environment.live_url;
  async submit() {
    if (this.role === 'Admin' || this.role === 'SuperAdmin') {
      const formValues = this.filterForm.value;

      // Create an array of query parameters with non-empty values
      const queryParams = [];
      // console.log(this.filterForm.value,"user filter values");
      
      for (const key in formValues) {
        const value = formValues[key];
        if (value !== '' && value !== undefined) {
          if (Array.isArray(value)) {
            // Handle multi-select fields
            if (value.length > 0) {
              // Convert array of objects to a comma-separated string of IDs
              if (key === 'reporting_to_ids') {
                const ids = value.map((item) => item).join(',');
                queryParams.push(`${key}=[${ids}]`);
              } else {
                const values = value.join(',');
                queryParams.push(`${key}=${values}`);
              }
            }
          } else {
            queryParams.push(`${key}=${value||''}`);
            // console.log(queryParams,"in else block");
            
          }
        }
      }

      // Construct the API request URL with query parameters
      var apiUrl = `${queryParams.join('&')}`;
      //console.log(this.filterForm.value);
      // localStorage.setItem('userFilter',JSON.stringify(this.filterForm.value))
      this.dataService.setUsersFilteredFormValues(this.filterForm.value);
      this.filtered = true;
      // Make the API request with the constructed URL

      // Handle the API response
      //console.log(apiUrl, 'apiurl in users filetr');

      this.emit.sendRefreshbyFilter(apiUrl);
      // this.dataService.setFilteredUrl(apiUrl)
      this.dataService.dataUpdated.emit(true);
      this.dataService.userFilter.next(true)

      this.dialogRef.close(true);
      // this.api.showSuccess(this.api.toTitleCase(resp.message))
    }
  }
  reset() {
    // localStorage.removeItem('userFilter');
    this.filterForm.reset();
    this.filterForm.updateValueAndValidity();
    this.dataService.resetUserFilterForm()
    this.emit.sendRefreshbyFilter(null);
    this.dataService.dataUpdated.emit(false);

    // this.dialogRef.close()
  }

  // if (window.performance) {
  //   if (performance.navigation.type === 1) {
  //     // This means the page is being hard refreshed
  //     // this.localStorageService.clearLocalStorage();
  //     localStorage.removeItem('userFilter')
  //   }
  // }

}
