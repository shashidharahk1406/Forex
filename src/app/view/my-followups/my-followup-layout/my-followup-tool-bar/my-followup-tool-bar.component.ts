import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-my-followup-tool-bar',
  templateUrl: './my-followup-tool-bar.component.html',
  styleUrls: ['./my-followup-tool-bar.component.css']
})
export class MyFollowupToolBarComponent implements OnInit {
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openVideoCall(){
    // const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
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
    // this._bottomSheet.open(RawDataSmsComponent,config);
  }
  openWhatsAppChat(){
    // const dialogRef = this.dialog.open(RawDataWhatsappchatComponent, {
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
    // this._bottomSheet.open(RawDataEmailComponent,config);
  }
  editLead(name:any){
    // const config: MatBottomSheetConfig = {
    //   panelClass: 'lead-bottom-sheet',
    //   data: {name:name}
    // };
    // this._bottomSheet.open(RawDataEditComponent,config);
  }
  referLead(){
    // const dialogRef = this.dialog.open(RawDataReferLeadComponent, {
    //   width:'40%'
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   console.log('The dialog was closed');
    // });
  }
}
