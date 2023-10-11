import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { RawDataReferLeadComponent } from '../raw-data-refer-lead/raw-data-refer-lead.component';
import { RawDataEditComponent } from '../raw-data-edit/raw-data-edit.component';
import { RawDataEmailComponent } from '../raw-data-email/raw-data-email.component';
import { RawDataWhatsappchatComponent } from '../raw-data-whatsappchat/raw-data-whatsappchat.component';
import { RawDataSmsComponent } from '../raw-data-sms/raw-data-sms.component';
import { RawDataVideoCallComponent } from '../raw-data-video-call/raw-data-video-call.component';
@Component({
  selector: 'app-raw-data-toolbar',
  templateUrl: './raw-data-toolbar.component.html',
  styleUrls: ['./raw-data-toolbar.component.css']
})
export class RawDataToolbarComponent implements OnInit {
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openVideoCall(){
    const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openSMS(name:any): void {
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(RawDataSmsComponent,config);
  }
  openWhatsAppChat(){
    const dialogRef = this.dialog.open(RawDataWhatsappchatComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
  openEmailChat(name?:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(RawDataEmailComponent,config);
  }
  editLead(name:any){
    const config: MatBottomSheetConfig = {
      panelClass: 'lead-bottom-sheet',
      data: {name:name}
    };
    this._bottomSheet.open(RawDataEditComponent,config);
  }
  referLead(){
    const dialogRef = this.dialog.open(RawDataReferLeadComponent, {
      width:'40%'
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }
}
