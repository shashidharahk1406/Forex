import { Component, Inject, OnInit } from '@angular/core';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { DisableChatComponent } from '../disable-chat/disable-chat.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

import { TranferCounsellorsComponent } from '../tranfer-counsellors/tranfer-counsellors.component';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-edit-user-profile-list',
  templateUrl: './edit-user-profile-list.component.html',
  styleUrls: ['./edit-user-profile-list.component.css'],
})
export class EditUserProfileListComponent implements OnInit {
  selectedImage: any = undefined;
  nameValidation: any;
  mobileNumberValidation: any;
  entered = false;
  allDepartment: any = [];
  allLevel: any = [];
  allRole: any = [];
  allUser: any = [];
  selectedArray: any = [];
  allDesignation: any = [];
  is_allow_for_app: boolean = false;
  user_id: any;
  id: any;
  min: Date;
  role: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileListComponent>,
    private api: ApiService,
    private emit: EmitService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public validationService: CommonServiceService,
    private fb: FormBuilder,
    private dataService:DataService
  ) {
    this.id = data.userdata.id;
    this.min = new Date('1900-01-01');
    this.role = localStorage.getItem('user_role');
  }

  ngOnInit(): void {
    this.initForm();
  }
  users: string[] = ['User 1', 'User 2', 'User 3'];
  levels: string[] = ['Level 1', 'Level 2', 'Level 3'];
  departments: string[] = ['Department 1', 'Department 2', 'Department 3'];

  editForm!: FormGroup;
  replaceUserForm!: FormGroup;
  user_details: any = [];
  initForm() {
    this.editForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.api.emailWithTldValidator(),
        ],
      ],
      mobile_number: [
        '',
        [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.required],
      ],
      emp_key: [''],
      // target:[''],
      // start_date:[''],
      designation_id: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
      reporting_to_ids: [null],
      // level_of_program_id:['',[Validators.required]],
      // department_id:['',[Validators.required]],
      password: [''],
      created_by: ['', [Validators.required]],
    });
    this.getAllDepartment();
    this.getAllLevel();
    this.getAllRole();
    this.getAllUser();
    this.getDesignation();
    this.getUserbyId();
  }

  checkValidity(control: AbstractControl | null) {
    this.entered = !!control?.value && control?.valid;
  }

  get f() {
    return this.editForm.controls;
  }
  date(event: MatDatepickerInputEvent<Date>) {
    this.editForm.patchValue({
      start_date: this.datePipe.transform(event.value, 'yyyy-MM-dd'),
    });
  }

  onKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    // You can add further handling if needed
  }
  onChange(event: any) {
    this.is_allow_for_app = event.checked;
  }
  newArrFromApi: any = [];
  userId: any;
  user_name:any;
  roleName:any;
  role_name:any;
  showTranferCounsellor:boolean=false
  getUserbyId() {
    this.api.getUserById(this.id).subscribe(
      (resp: any) => {
        // console.log(resp, 'resp');
        this.userId = resp.result[0].id;
        this.user_name=resp.result[0].first_name;
        // console.log(this.userId, 'userid');

        this.roleName=resp.result[0].role_id;

        this.role_name=resp.result[0].role_name

        if (resp.result[0].role_id === 6) {
          this.showTranferCounsellor = true;
        } 
        if (resp.result[0].role_id === 3) {
          this.isReportingToUser = true;
        } else {
          this.isReportingToUser = false;
        }

        this.user_details = resp.result[0];
        resp.result[0].reporting_to_ids.forEach((element: any) => {
          this.selectedArray.push(element.id);
          this.newArrFromApi.push(element);
        });
        this.editForm.patchValue({ first_name: resp.result[0].first_name });
        this.editForm.patchValue({ last_name: resp.result[0].last_name });
        this.editForm.patchValue({ email: resp.result[0].email });
        this.editForm.patchValue({
          mobile_number: resp.result[0].mobile_number,
        });
        this.editForm.patchValue({ emp_key: resp.result[0].emp_key });
        // this.editForm.patchValue({target:resp.result[0].target})
        this.editForm.patchValue({ start_date: resp.result[0].start_date });
        this.editForm.patchValue({
          designation_id: resp.result[0].designation_id,
        });
        this.editForm.patchValue({ role_id: resp.result[0].role_id });
        this.editForm.patchValue({ reporting_to_ids: this.selectedArray });
        this.editForm.patchValue({
          is_allow_for_app: resp.result[0].is_allow_for_app,
        });
        // this.editForm.patchValue({level_of_program_id:resp.result[0].level_of_program_id})
        // this.editForm.patchValue({department_id:resp.result[0].department_id})
        this.editForm.patchValue({ password: resp.result[0].password });
        this.editForm.patchValue({ created_by: resp.result[0].created_by });
        this.getCounselloIdsForAdmin();
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
  getAllRole() {
    this.api.getAllRole().subscribe(
      (resp: any) => {
        if (this.role === 'SuperAdmin') {
          this.allRole = resp.results.filter(
            (ele: any) =>
              ele.name === 'counsellor' ||
              ele.name === 'Admin' ||
              ele.name === 'SuperAdmin'
          );
        }
        if (this.role === 'Admin') {
          this.allRole = resp.results.filter(
            (ele: any) => ele.name === 'counsellor'
          );
        }
        // this.allRole=resp.results
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

  openFileInput(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  handleFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
  }

  removeSelectedFile() {
    this.selectedImage.splice(1);
  }
  openDisableChat(id: any) {
    const dialogRef = this.dialog.open(DisableChatComponent, {
      width: '35%',
      data: id,
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
    });
  }
  openResetPassword(userdata: any) {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '40%',
      data: { userdata: userdata },
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log('The dialog was closed');
    });
  }
  newArr: any = [];
  onSelectionChange(event: any): void {
    // console.log(event.value, 'selecting uusers');

    this.newArrFromApi = [];
    event.value.forEach((element: any) => {
      const itemIndex = this.newArr.findIndex(
        (item: any) => item.id === element
      );

      if (itemIndex === -1) {
        // Check if the ID exists in allUser array
        const user = this.allUser.find((user: any) => user.id === element);

        if (user) {
          let data = {
            name: user.first_name,
            id: user.id,
          };
          this.newArr.push(data);
        }
      }
    });

    // Remove deselected items
    // this.newArr = this.newArr.filter((item: any) => {
    //   // Check if the ID exists in allUser array
    //   console.log(this.newArr,"new arr");

    //   return this.allUser.find((user: any) => user.id === item.id);
    // });
    this.newArr = this.newArr.filter((item: any) => {
      return event.value.find((element: any) => element === item.id);
    });
  }

  async submit() {
    //console.log(this.editForm.value,"edit form submission");

    // this.editForm.patchValue({reporting_to_ids:this.newArr})
    if (this.isReportingToUser == false && this.roleId === 6) {
      this.newArr = [];
      this.newArrFromApi = [];
      this.editForm.patchValue({ reporting_to_ids: {} });
      this.roleChangeFromCounsellorToAdmin();
    }
    if (this.isReportingToUser == false && this.roleId === 7) {
      this.newArr = [];
      this.newArrFromApi = [];
      this.editForm.patchValue({ reporting_to_ids: {} });
    
    }
    if (this.newArrFromApi.length == 0) {
      this.editForm.patchValue({ reporting_to_ids: this.newArr });
    } else if (this.newArr.length == 0) {
      this.editForm.patchValue({ reporting_to_ids: this.newArrFromApi });
    }

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
    } else {
      this.api.editUser(this.id, this.editForm.value).subscribe(
        (resp: any) => {
          this.dataService.customerEdit.next(true)
          this.emit.sendRefresh(true);
          this.dialogRef.close(true);
          this.api.showSuccess(this.api.toTitleCase(resp.message));
        },
        (error: any) => {
          this.api.showError(this.api.toTitleCase(error.error.message));
        }
      );
    }
  }

  roleId: any;
  filteredUsers1: any;
  isReportingToUser: boolean = false;
  onRoleChange(id: any) {
    this.roleId = id;
    // console.log(this.roleId, 'roleId');
    if(id===6){
      this.showTranferCounsellor = true;
    }
    else{
      this.showTranferCounsellor = false;
    }
    // this.allUser=[]
    if (
      (this.roleId === 3 || this.roleId === 7) &&
      this.counsellorIds.length > 0
    ) {
      this.openTransferCounsellorsComponent();
    }
    if (this.roleId === 3) {
      this.isReportingToUser = true;
      this.allUser = this.allUser.filter((ele: any) => {
        return ele.role_name === 'Admin';
      });
    } else if (this.roleId === 6|| this.roleId === 7) {
      this.isReportingToUser = false;
    }
  }

  roleChangeFromCounsellorToAdmin() {
    const data = {
      user_id: this.userId,
      role_change_to: 'admin',
    };

    this.api.counsellorToAdmin(data).subscribe(
      (res: any) => {
        // console.log(res, 'counsellor to admin role has been changed');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  counsellorIds: any;
  getCounselloIdsForAdmin() {
    this.api.getCounsellorIds(this.userId).subscribe(
      (res: any) => {
        // console.log(res.results, 'ids under a admin');
        this.counsellorIds = res.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openTransferCounsellorsComponent() {
    const dialogRef = this.dialog.open(TranferCounsellorsComponent, {
      width: '45%',
      data: {
        counsellorIds: this.counsellorIds,
        userId: this.userId,
        roleId: this.roleId,
        userName:this.user_name
      },
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result==false){
        // this.dialogRef.close();
      }
    });
  }

  transferCounsellors(){
    if(window.confirm("Are you sure to transfer counsellors? ")) {
      if( this.counsellorIds.length>0){
        this.openTransferCounsellorsComponent()
      }
      else{
        this.api.showWarning('Counsellors are not available')
      }
  }
}
}