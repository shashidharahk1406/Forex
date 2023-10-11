import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
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
    // const dialogRef = this.dialog.open(LeadVideoCallComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openSMS(name:any): void {
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadSMSComponent,config);
  }
  openWhatsAppChat(){
    // const dialogRef = this.dialog.open(LeadWhatsappChatComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
  openEmailChat(name?:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadEmailComponent,config);
  }
  editLead(name:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(LeadEditComponent,config);
  }
  referLead(){
    // const dialogRef = this.dialog.open(ReferLeadComponent, {
    //   width:'40%'
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
}
