import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { WhatsappChatWhatsappComponent } from '../whatsapp-chat-whatsapp/whatsapp-chat-whatsapp.component';
@Component({
  selector: 'app-wharsapp-chat-toolbar',
  templateUrl: './wharsapp-chat-toolbar.component.html',
  styleUrls: ['./wharsapp-chat-toolbar.component.css']
})
export class WharsappChatToolbarComponent implements OnInit {
  constructor(private _bottomSheet:  MatBottomSheet,private dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openVideoCall(){
    // const dialogRef = this.dialog.open(RawDataVideoCallComponent, {
    //   width:'45%',
    // });
  
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   //console.log('The dialog was closed');
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
    const dialogRef = this.dialog.open(WhatsappChatWhatsappComponent, {
      width:'45%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    });
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
    //   //console.log('The dialog was closed');
    // });
  }
}

