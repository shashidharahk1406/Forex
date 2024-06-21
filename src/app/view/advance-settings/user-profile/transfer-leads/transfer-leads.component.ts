import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/API/api.service';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-leads',
  templateUrl: './transfer-leads.component.html',
  styleUrls: ['./transfer-leads.component.css']
})
export class TransferLeadsComponent implements OnInit {

  constructor(
    private _baseService: BaseServiceService,
    private api: ApiService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data, 'data from delete-users component');
    this.userId=data.data.userId
    console.log( this.userId, ' this.userId in constructor');
  }
  admins: any;
  userId:any;

  transferLeadsForm!: FormGroup;

  ngOnInit() {
    this.getLeadOwners();

    this.transferLeadsForm = this._fb.group({
      user_id: this.data.data.userId,
      lead_owner_ids: ['', Validators.required],
     
    });
  }

  clearSelectField(fieldName: string) {
    this.transferLeadsForm.get(fieldName)?.reset();
  }

  get f() {
    return this.transferLeadsForm.controls;
  }
  getLeadOwners() {
    // let query = `?role_name=superadmin`;

    this._baseService.getData(`${environment._user}`).subscribe(
      (res: any) => {
        console.log(res, 'leadowners');

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
    if (this.transferLeadsForm.invalid) {
      this.transferLeadsForm.markAllAsTouched();
    } else {
      let formData: any = {};
      const f = this.transferLeadsForm.value;
      console.log(this.userId," this.data.userId");
      
      formData = {
        user_id: f.user_id,
        lead_owner_ids:f.lead_owner_ids
      };
      this.api.transferDeleteAdminAndCounsellor(formData).subscribe(
        (res: any) => {

          console.log(
            res,
            'transferring leads '
          );
          this.api.showSuccess(res.message);
          if(this.data.callback){
            this.data.callback();
          }
          this.dialogRef.close();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
  close() {
    this.dialogRef.close();
  }

}
