import { Component, OnInit,Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { RawDataVideoCallComponent } from '../raw-data-video-call/raw-data-video-call.component';
import { RawDataCallComponent } from '../raw-data-call/raw-data-call.component';
import { RawDataSmsComponent } from '../raw-data-sms/raw-data-sms.component';
import { RawDataEmailComponent } from '../raw-data-email/raw-data-email.component';
import { RawDataWhatsappchatComponent } from '../raw-data-whatsappchat/raw-data-whatsappchat.component';
import { RawDataViewAllComponent } from '../raw-data-view-all/raw-data-view-all.component';

@Component({
  selector: 'app-raw-data-card-content',
  templateUrl: './raw-data-card-content.component.html',
  styleUrls: ['./raw-data-card-content.component.css']
})
export class RawDataCardContentComponent implements OnInit {
@Input()leadData:any;
expandPanel=false;
morePanel: boolean = false;
constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}

ngOnInit(): void {
}
openMorePanel(){
  this.morePanel = !this.morePanel
}

openCall(name:string){
  const dialogRef = this.dialog.open(RawDataCallComponent, {
    width:'30%',
    data: {name:name}
  });
  dialogRef.disableClose=true

  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
  }); 
}
openSMS(name:any): void {
  const config: MatBottomSheetConfig = {
    panelClass: 'lead-bottom-sheet',
    data: {name:name},
    disableClose: true
  };
  this._bottomSheet.open(RawDataSmsComponent,config);
}
openWhatsAppChat(){
  const dialogRef = this.dialog.open(RawDataWhatsappchatComponent, {
    width:'45%',
  });
  dialogRef.disableClose=true
  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
  });
}
openEmailChat(name:any){
  const config: MatBottomSheetConfig = {
    panelClass: 'lead-bottom-sheet',
    data: {name:name},
    disableClose: true
  };
  this._bottomSheet.open(RawDataEmailComponent,config);
}
openVideoCall(){
  const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
    width:'45%',
  });
  dialogRef.disableClose=true
  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
  });
}
openViewAll(name:any){
  const dialogRef = this.dialog.open(RawDataViewAllComponent, {
    width:'60%',
    data: {name:name}
  });
  dialogRef.disableClose=true

  dialogRef.afterClosed().subscribe((result:any) => {
    //console.log('The dialog was closed');
  });
}
editLead(name:any){
  // const config: MatBottomSheetConfig = {
  //   panelClass: 'lead-bottom-sheet',
  //   data: {name:name}
  // };
  // this._bottomSheet.open(LeadEditComponent,config);
}

}
