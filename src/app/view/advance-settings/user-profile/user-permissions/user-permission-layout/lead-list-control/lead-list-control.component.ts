import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { EditLeadlistPermissionsComponent } from '../edit-leadlist-permissions/edit-leadlist-permissions.component';

@Component({
  selector: 'app-lead-list-control',
  templateUrl: './lead-list-control.component.html',
  styleUrls: ['./lead-list-control.component.css'],
})
export class LeadListControlComponent implements OnInit {
  id: any;
  user_id: any;
  leadListPermissions: any = [];
  checked: boolean = false;
  editForm: any;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private emit: EmitService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user_id = localStorage.getItem('user_id');
    localStorage.setItem('id', this.id);
  }

  ngOnInit(): void {
    this.leadListPermissionsById();
    this.emit.getRefresh.subscribe((res: any) => {
      if (res == true) {
        this.leadListPermissionsById();
      }
    });

    this.editForm = this._fb.group({
      edit_lead: ['', [Validators.required]],
      view_history: ['', [Validators.required]],
      add_followup: ['', [Validators.required]],
      add_note: ['', [Validators.required]],
      delete_lead: ['', [Validators.required]],
      payment_details: ['', [Validators.required]],
      download_leads: ['', [Validators.required]],

      email: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      sms: ['', [Validators.required]],
    });
    this.getLeadListPermissionsById();
  }

  leadListPermissionsById() {
    this.api.getLeadListPermissions(this.id).subscribe(
      (res: any) => {
        console.log(res, 'getLeadListPermissions');
        this.leadListPermissions = res.results[0].lead_list_sett[0];

        console.log(this.leadListPermissions, 'perrrrr');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openEdit(id: any) {
    console.log(id, 'iddddddddddddd');
    const dialogRef = this.dialog.open(EditLeadlistPermissionsComponent, {
      width: '45%',

      data: id,
    });

    dialogRef.disableClose=true

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  get f() {
    return this.editForm.controls;
  }

  getLeadListPermissionsById() {
    this.api.getLeadListPermissions(this.id).subscribe(
      (res: any) => {
        console.log(res, 'res');
        this.editForm.patchValue({
          edit_lead: res.results[0].lead_list_sett[0].edit_lead,
        });
        this.editForm.patchValue({
          view_history: res.results[0].lead_list_sett[0].view_history,
        });
        this.editForm.patchValue({
          add_followup: res.results[0].lead_list_sett[0].add_followup,
        });
        this.editForm.patchValue({
          add_note: res.results[0].lead_list_sett[0].add_note,
        });
        this.editForm.patchValue({
          delete_lead: res.results[0].lead_list_sett[0].delete_lead,
        });
        this.editForm.patchValue({
          payment_details: res.results[0].lead_list_sett[0].payment_details,
        });
        this.editForm.patchValue({
          download_leads: res.results[0].lead_list_sett[0].download_leads,
        });
        this.editForm.patchValue({
          email: res.results[0].lead_list_sett[0].email,
        });
        this.editForm.patchValue({
          whatsapp: res.results[0].lead_list_sett[0].whatsapp,
        });
        this.editForm.patchValue({ sms: res.results[0].lead_list_sett[0].sms });
      },
      (error: any) => {
        console.log(error);
        this.api.showError(error.error.message);
      }
    );
  }

  edit() {
    this.api.updateLeadListPermissions(this.id, this.editForm.value).subscribe(
      (resp: any) => {
        this.emit.sendRefresh(true);
        // this.dialogRef.close()
        this.api.showSuccess(resp.message);
      },
      (error: any) => {
        console.log(error);
        this.api.showError(error.error.message);
      }
    );
  }
}
