import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/API/api.service';
import { EmitService } from 'src/app/service/emit/emit.service';
import { ReferLeadComponent } from 'src/app/view/lead-list/lead-layout/refer-lead/refer-lead.component';
import { TransferLeadsComponent } from '../transfer-leads/transfer-leads.component';
import { TranferCounsellorsComponent } from '../user-profile-list/tranfer-counsellors/tranfer-counsellors.component';
import { resolve } from 'path';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css'],
})
export class DeleteUsersComponent implements OnInit {
  url: any;
  id: any;
  user_name: any;
  leadIds: any = [];
  roleName:any
  // disableClose:boolean=true
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<any>,
    private emit: EmitService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.url = data.apiUrl;
    this.id = data.id;
    this.user_name = data.userName;
    this.roleName=data.roleName
    // console.log(this.url,"data from pc");
    // console.log(this.user_name,"name in delete");
    // this.url=data
    console.log(data, 'data from user-profile component');

    // this.id=id
  }
  ngOnInit() {
    this.getIds();
    this.getCounselloIdsForAdmin();
  }
  async delete() {
    //console.log(this.url,"URL")
    this.dialogRef.close();
let istransfer:boolean=true
    if(this.roleName=='Admin'&&this.counsellorIds.length>0){
      istransfer=false
    await this.openTransferCounsellorsComponent(istransfer)
    }
    if(this.roleName=='Admin'&&this.leadIds.length>0&&istransfer==true){
      istransfer=false

     await this.transferLead(istransfer);
    }
    if(this.roleName=='counsellor'&&this.leadIds.length>0&&istransfer==true){
      istransfer=false
    await  this.transferLead(istransfer);
    }
    if(istransfer==true){
      this.deleteUsers();
    }

  

    //   this.api.delete(this.url).subscribe(
    //     (resp:any)=>{
    //       this.emit.sendRefresh(true)
    //       this.dialogRef.close()
    //       this.api.showSuccess(this.api.toTitleCase(resp.message))
    //     },
    //     (error:any)=>{
    //       //console.log(error);
    //        this.api.showError(this.api.toTitleCase(error.error.message))
    //     }
    //   )
    // }

    //
  }

  deleteUsers() {
    this.api.delete(this.url).subscribe(
      (resp: any) => {
        this.emit.sendRefresh(true);
        this.dialogRef.close();
        this.api.showSuccess(this.api.toTitleCase(resp.message));
      },
      (error: any) => {
        //console.log(error);
        this.api.showError(this.api.toTitleCase(error.error.message));
      }
    );
  }

  transferLead(istransfer:boolean) {

  return new Promise((resolve:any,reject:any)=>{
   const dialogRef = this.dialog.open(TransferLeadsComponent, {
      width: '40%',
      data: { data: this.data, callback: this.deleteUsers.bind(this) },
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result: any) => {
     if(result==true){
          istransfer=true
        }
        resolve(true)
      //console.log('The dialog was closed');
    });
  })
   
  }

  getIds() {
    this.api
      .getLeadsIdsTodeleteAdminCounsellor(this.data.userId)
      .subscribe((res: any) => {
        console.log(res, 'lead ids for an user');
        this.leadIds = res.result[0].map((item: any) => item.lead);
        console.log(this.leadIds, 'leadids');
      });
  }


  openTransferCounsellorsComponent(istransfer:boolean) {
    return new Promise((resolve:any,reject:any)=>{
      const dialogRef = this.dialog.open(TranferCounsellorsComponent, {
        width: '45%',
        data: {
          counsellorIds: this.counsellorIds,
          userId: this.data.userId,
          userName:this.user_name,
          isDelete:true,
          roleId:this.data.roleId
        },
      });
  
      dialogRef.disableClose = true;
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if(result==true){
          istransfer=true
        }
        resolve(true)
      });
    })
   
  }

  counsellorIds: any;
  getCounselloIdsForAdmin() {
    this.api.getCounsellorIds(this.data.userId).subscribe(
      (res: any) => {
        console.log(res.results, 'ids under a admin');
        this.counsellorIds = res.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
