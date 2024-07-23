import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tranfer-counsellors',
  templateUrl: './tranfer-counsellors.component.html',
  styleUrls: ['./tranfer-counsellors.component.css'],
})
export class TranferCounsellorsComponent implements OnInit {
  constructor(
    private _baseService: BaseServiceService,
    private api: ApiService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data, 'data from edit user-profile');
    console.log(data.isDelete,"data from delete component");
    
  }
  admins: any;

  transferCounsellorsForm!: FormGroup;

  ngOnInit() {
    this.getAdmins();

    this.transferCounsellorsForm = this._fb.group({
      // counsellor_ids: ['', Validators.required],
      transfer_to_ids: [[], Validators.required],
      // user_id: ['', Validators.required],
      // role_change_to: ['counsellor'],
    });
  }

  clearSelectField(fieldName: string) {
    this.transferCounsellorsForm.get(fieldName)?.reset();
  }

  get f() {
    return this.transferCounsellorsForm.controls;
  }
  getAdmins() {
    let query = `?role_name=admin`;

    this._baseService.getData(`${environment._user}${query}`).subscribe(
      (res: any) => {
        console.log(res, 'admins');

        if (res) {
          this.admins = res.results;
        }
      },
      (error: any) => {
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  onSubmit() {
    if (this.transferCounsellorsForm.invalid) {
      this.transferCounsellorsForm.markAllAsTouched();
    } else {
      let formData: any = {};
      const f = this.transferCounsellorsForm.value;
      console.log(this.data.isDelete,"this.data.isDelete");
      
      if (this.data.counsellorIds&&this.data.isDelete) {
     
        let res=this.data.counsellorIds.map((item:any)=>item.id)
        console.log(res,"cids in an array");
        
      
        formData = {
          user_id: this.data?.userId,
          counsellor_ids: res,
          transfer_to_ids:f.transfer_to_ids,
          // role_change_to:this.data?.roleId===6? 'admin':'',
        };

        
      }
      if (this.data.counsellorIds&&!this.data.isDelete) {
     
        let res=this.data.counsellorIds.map((item:any)=>item.id)
        console.log(res,"cids in an array");
        
      
        formData = {
          user_id: this.data?.userId,
          counsellor_ids: res,
          transfer_to_ids:f.transfer_to_ids,
          // role_change_to:this.data?.roleId===3? 'counsellor':'superadmin',
        };

        
      }
      this.api.adminToCounsellor(formData).subscribe(
        (res: any) => {

          console.log(
            res,
            'res for changing the role from admin to counsellor'
          );
          this.api.showSuccess(res.message);
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
  close() {
    this.dialogRef.close(false);
  }
}
